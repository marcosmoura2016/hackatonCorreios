<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />


        <!-- Analytic -->

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T5E769J6R0"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T5E769J6R0');
        </script>

        <link href="{{ asset('css/styles.css') }}" rel="stylesheet">

    </head>
    <body>
        <header>
            <nav class="navbar">
                <img src="{{ asset('images/correioLogo.svg') }}" alt="LogoCorreio">
                <span> Bom dia! Jorge Hoje é Segunda-feira está 28Cº e a previsão e de Ceus limpo</span>
                <div id="user-info" class="userInfo">
                    <img class="image" src="{{ asset('images/userIcon.svg') }}" alt="userIcon">
                    <div>
                        Jorge Alfedro <br>
                        Goiania - GO    <br>
                        09:10 - 13 de junho 2025 <br>
                    </div>
                </div>
            </nav>
            <div class="stripes">
                <div class="yellow-stripe"> </div>
                <div class="dark-blue-stripe "> </div>
            </div>
        </header>

        <div class="search-container">
            <div class="search-box">
                <input type="text" id="search-input" placeholder="Que serviço você procura?" autocomplete="off">
                <div class="search-button">
                    <img src="{{ asset('images/searchIcon.svg') }}" alt="">
                </div>
            </div>
            <ul id="suggestions-list" class="suggestions-list"></ul>
        </div>

        <main class="main">
            <h3>Ultimos Acessos</h3>
            <section id="services-section" class="services-section" data-icon-path="{{ asset('images/') }}">
                <div id="service-container" class="service">
                    <div class="yellow-stripe"></div>
                    <div id="service-content" class="service-content">

                    </div>
                </div>
            </section>

            <h3>Serviços</h3>
            <section id="all-services-section" class="services-section" data-icon-path="{{asset('images/')}}">
            </section>
        </main>
        
        
        <div>
            <button id="chatbot-button">
                <img src="{{ asset('images/lunaNuvemTexto.svg') }}" alt="Luna">
            </button>
        <div id="chatbox">
            <div id="chatbox-header">Chatbot</div>
            <div id="chatbox-messages"></div>
            <div id="chatbox-input">
                <textarea id="message-input" placeholder="Digite uma mensagem..."></textarea>
                <button id="send-button">Enviar</button>
            </div>
        </div>
        </div>

        <script src="{{ asset('js/script.js') }}"></script>
        <script src="{{ asset('js/lunaScript.js') }}"></script>
    </body>
</html>
