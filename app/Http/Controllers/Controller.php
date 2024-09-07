<?php

namespace App\Http\Controllers;

abstract class Controller
{
    // Configurações
    private $KEY_FILE_LOCATION = '';
    private $VIEW_ID = 'YOUR_VIEW_ID';
    private $DB_HOST = 'localhost';
    private $DB_USER = 'your_user';
    private $DB_PASSWORD = 'your_password';
    private $DB_NAME = 'DB_DATABASE';

    public function __construct()
    {
        $analytics = initializeAnalytics();
        $response = getReport($analytics);
        saveToDatabase($response);
    } 

    function initializeAnalytics()
    {
        $client = new GoogleClient();
        $client->setAuthConfig($this->KEY_FILE_LOCATION);
        $client->addScope(GoogleAnalytics::ANALYTICS_READONLY);

        return new GoogleAnalytics($client);
    }

    // Obtém os dados da API
    function getReport($analytics)
    {
        $response = $analytics->reports->batchGet(array(
            'reportRequests' => array(
                array(
                    'viewId' => $this->VIEW_ID,
                    'dateRanges' => array(
                        array(
                            'startDate' => '30daysAgo',
                            'endDate' => 'today'
                        )
                    ),
                    'metrics' => array(
                        array('expression' => 'ga:sessions'),
                        array('expression' => 'ga:pageviews'),
                        array('expression' => 'ga:users'),
                        array('expression' => 'ga:sessionDuration'),
                        array('expression' => 'ga:bounceRate')
                    ),
                    'dimensions' => array(
                        array('name' => 'ga:date'),
                        array('name' => 'ga:source'),
                        array('name' => 'ga:medium'),
                        array('name' => 'ga:country'),
                        array('name' => 'ga:browser')
                    )
                )
            )
        ));

        return $response;
    }

    // Salva os dados no banco de dados
    function saveToDatabase($data)
    {
        $pdo = new PDO("mysql:host=$this->DB_HOST;dbname=$this->DB_NAME", $this->DB_USER, $this->DB_PASSWORD);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("
            INSERT INTO analytics_data (date, source, medium, country, browser, sessions, pageviews, users, session_duration, bounce_rate) 
            VALUES (:date, :source, :medium, :country, :browser, :sessions, :pageviews, :users, :session_duration, :bounce_rate)
        ");

        foreach ($data->getReports() as $report) {
            foreach ($report->getData()->getRows() as $row) {
                $dimensions = $row->getDimensions();
                $metrics = $row->getMetrics()[0]->getValues();

                $stmt->execute(array(
                    ':date' => $dimensions[0],
                    ':source' => $dimensions[1],
                    ':medium' => $dimensions[2],
                    ':country' => $dimensions[3],
                    ':browser' => $dimensions[4],
                    ':sessions' => $metrics[0],
                    ':pageviews' => $metrics[1],
                    ':users' => $metrics[2],
                    ':session_duration' => $metrics[3],
                    ':bounce_rate' => $metrics[4]
                ));
            }
        }
    }   
}
