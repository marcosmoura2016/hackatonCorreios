document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsList = document.getElementById("suggestions-list");

    const suggestions = [
        "Despacho Internacional",
        "Despacho Nacional",
        "Declaração de Conteúdo",
        "Devolução de Documento (DD)",
        "Coleta Agendada",
        "Pré-postagem internacional",
        "Acompanhe seu objeto",
        "Documento Internacional",
        "Fatura Eletrônica",
        "Preços e Prazos",
    ];

    const lastAccesses = [
        {
            title: "Despacho Internacional",
            icon: "despachoInternacionalIcon.svg",
            alt: "despachoInternacionalIcon",
        },
        {
            title: "Despacho Nacional",
            icon: "despachoNacionalIcon.svg",
            alt: "despachoNacionalIcon",
        },
        { title: "E-Carta", icon: "eCartaIcon.svg", alt: "eCartaIcon" },
    ];

    const allServices = [
        {
            title: "Coleta Agendada",
            icon: "coletaAgendadaIcon.svg",
            alt: "coletaAgendadaIcon",
        },
        {
            title: "Pré-postagem internacional",
            icon: "despachoInternacionalIcon.svg",
            alt: "Pré-postagemInternacionalIcon",
        },
        {
            title: "Acompanhe seu objeto",
            icon: "searchBox.svg",
            alt: "AcompanheSeuPedido",
        },
        {
            title: "Documento Internacional",
            icon: "worldIcon.svg",
            alt: "DocumentoInternaciona",
        },
        {
            title: "Fatura Eletrônica",
            icon: "paperBill.svg",
            alt: "FaturaEletrônica",
        },
        {
            title: "Preços e Prazos",
            icon: "timeMoneyIcon.svg",
            alt: "Preços e Prazos",
        },
    ];

    // Chama showLastServices e passa lastAccesses como argumento
    showLastServices(lastAccesses);

    // Chama showAllServices e passa lastAccesses como argumento
    showAllServices(allServices);

    function showLastServices(services) {
        const serviceSection = document.getElementById("services-section");
        const iconPath = serviceSection.getAttribute("data-icon-path");

        // Certifica-se de limpar o conteúdo da seção antes de adicionar novos serviços
        serviceSection.innerHTML = "";

        services.forEach((service) => {
            var serviceContainer = document.createElement("div");
            serviceContainer.className = "service";

            var yellowStripe = document.createElement("div");
            yellowStripe.className = "yellow-stripe";

            var serviceContent = document.createElement("div");
            serviceContent.className = "service-content";

            var serviceIcon = document.createElement("img");
            serviceIcon.src = `${iconPath}/${service.icon}`;
            serviceIcon.alt = service.alt;
            serviceIcon.style.width = "5vh";

            // Adiciona o ícone e o título ao conteúdo do serviço
            serviceContent.appendChild(serviceIcon);

            var serviceTitle = document.createElement("p");
            serviceTitle.textContent = service.title;
            serviceContent.appendChild(serviceTitle);

            // Adiciona os elementos ao container do serviço
            serviceContainer.appendChild(yellowStripe);
            serviceContainer.appendChild(serviceContent);

            // Adiciona o container do serviço à seção de serviços
            serviceSection.appendChild(serviceContainer);
        });
    }

    function showAllServices(services) {
        const allServiceSection = document.getElementById(
            "all-services-section"
        );
        const iconPath = allServiceSection.getAttribute("data-icon-path");

        // Certifica-se de limpar o conteúdo da seção antes de adicionar novos serviços
        allServiceSection.innerHTML = "";

        services.forEach((service) => {
            var serviceContainer = document.createElement("div");
            serviceContainer.className = "service";

            var yellowStripe = document.createElement("div");
            yellowStripe.className = "yellow-stripe";

            var serviceContent = document.createElement("div");
            serviceContent.className = "service-content";

            var serviceIcon = document.createElement("img");
            serviceIcon.src = `${iconPath}/${service.icon}`;
            serviceIcon.alt = service.alt;
            serviceIcon.style.width = "6vh";

            // Adiciona o ícone e o título ao conteúdo do serviço
            serviceContent.appendChild(serviceIcon);

            var serviceTitle = document.createElement("p");
            serviceTitle.textContent = service.title;
            serviceContent.appendChild(serviceTitle);

            // Adiciona os elementos ao container do serviço
            serviceContainer.appendChild(yellowStripe);
            serviceContainer.appendChild(serviceContent);

            // Adiciona o container do serviço à seção de serviços
            allServiceSection.appendChild(serviceContainer);
        });
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsList.innerHTML = "";

        if (query) {
            const filteredSuggestions = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(query)
            );

            filteredSuggestions.forEach((suggestion) => {
                const li = document.createElement("li");
                li.textContent = suggestion;
                li.addEventListener("click", () => {
                    searchInput.value = suggestion;
                    suggestionsList.innerHTML = "";
                });
                suggestionsList.appendChild(li);
            });
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", (event) => {
        if (
            !searchInput.contains(event.target) &&
            !suggestionsList.contains(event.target)
        ) {
            suggestionsList.innerHTML = "";
        }
    });
});
