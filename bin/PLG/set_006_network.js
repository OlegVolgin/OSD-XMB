//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NAME_MAIN =
[
    "Network Settings",
    "Paramètres réseau",
    "Ajustes de red",
    "Netzwerk-Einstellungen",
    "Impostazioni di rete",
    "Netwerkinstellingen",
    "Definições de Rede"
    "Настройки сети"
];

const DESC_MAIN =
[
    "Adjusts settings for the internet connection.",
    "Adjusts settings for the internet connection.",
    "Ajusta la configuración de la conexión a Internet.",
    "Adjusts settings for the internet connection.",
    "Adjusts settings for the internet connection.",
    "Adjusts settings for the internet connection.",
    "Adjusts settings for the internet connection.",
    "Изменяет настройки соединения с Интернетом."
];

const NAME_SET1 =
[
    "Settings and Connection Status List",
    "Liste des paramètres et de l'état de la connexion",
    "Ajustes y lista de estado de conexión",
    "Liste der Einstellungen und des Verbindungsstatus",
    "Elenco delle impostazioni e dello stato di connessione",
    "Instellingen en verbindingsstatus",
    "Lista de Definições e Estado das Ligações",
    "Список настроек и состояний соединения"
];

const DESC_SET1 =
[
    "View current network settings.",
    "Pour afficher les paramètres réseau actuels.",
    "Puede visualizar los ajustes de red actuales.",
    "Sie können die aktuellen Netzwerk-Einstellungen.",
    "È possibile visualizzare le impostazioni di rete correnti.",
    "De huidige netwerkinstellingen en de status van de internetverbinding weergeven.",
    "Visualize as definições de rede e o estado das ligações de Internet actuais.",
    "Показывает текущие настройки сети."
];

const NAME_SET2 =
[
    "Internet Connection",
    "Connexion Internet",
    "Conexión a Internet",
    "Internetverbindung",
    "Connessione Internet",
    "Internetverbinding",
    "Ligação à Internet",
    "Соединение с Интернетом"
];

const DESC_SET2 =
[
    "Enable or disable the system's connection to the Internet.",
    "Pour activer ou désactiver connexion du système à Internet.",
    "Puede activar o desactivar la conexión del sistema a Internet.",
    "Sie können die Verbindung des Systems zum Internet aktivieren oder deaktivieren.",
    "È possibile abilitare o disabilitare la connessione a Internet del sistema.",
    "De internetverbinding van het systeem in- of uitschakelen.",
    "Active ou desactive a ligação do sistema à Internet.",
    "Устанавливает соединение этой системы с интернетом."
];

const INFO_1 =
[
    "Internet Connection",
    "Internet Connection",
    "Conexión a Internet",
    "Internet Connection",
    "Internet Connection",
    "Internet Connection",
    "Internet Connection",
    "Соединение с Интернетом"
];

const INIT_MSG =
[
    "Trying to connect, please wait...",
    "Tentative de connexion, veuillez patienter...",
    "Intentando conectar, por favor espere...",
    "Versuch der Verbindung, bitte warten...",
    "Tentativo di connessione, attendere prego...",
    "Bezig met verbinden, even geduld a.u.b...",
    "A tentar conectar, por favor aguarde...",
    "Попытка подключения, подождите..."
];

const INIT_COMPLETE_MSG =
[
    "Connection successful.",
    "Connexion réussie.",
    "Conexión exitosa.",
    "Verbindung erfolgreich.",
    "Connessione riuscita.",
    "Verbinding geslaagd.",
    "Conexão bem-sucedida.",
    "Успешное подключение."
];

const ERR_1 =
[
    "Could not initialize Network.\nPlease check your connection and restart the console.",
    "Impossible d'initialiser le réseau.\nVeuillez vérifier votre connexion et redémarrer la console.",
    "No se pudo inicializar la red.\nCompruebe su conexión y reinicie la consola.",
    "Netzwerk konnte nicht initialisiert werden.\nBitte überprüfen Sie Ihre Verbindung und starten Sie die Konsole neu.",
    "Impossibile inizializzare la rete.\nControlla la tua connessione e riavvia la console.",
    "Kan netwerk niet initialiseren.\nControleer uw verbinding en start de console opnieuw op.",
    "Não foi possível inicializar a Rede.\nVerifique a sua ligação e reinicie a consola.",
    "Не получается инициализировать Сеть. Пожалуйста проверьте Ваше подключение и перезапустите консоль."
];

//////////////////////////////////////////////////////////////////////////
///*				   		CUSTOM FUNCTIONS						  *///
//////////////////////////////////////////////////////////////////////////

function showNetInfoMsg()
{
    // Place all the Data extracted into the object
    const netInfo = [];

    const conf = Network.getConfig();
    let enabled = (DATA.NET) ? TXT_ENABLED : TXT_DISABLED;
    let ip = (DATA.NET) ? conf.ip.toString() : " - ";
    let mask = (DATA.NET) ? conf.netmask.toString() : " - ";
    let dns = (DATA.NET) ? conf.dns.toString() : " - ";
    let gateway = (DATA.NET) ? conf.gateway.toString() : " - ";

    netInfo.push({
        Selectable: false,
        get Name()
        {
            return INFO_1[DATA.LANGUAGE];
        },
        get Description()
        {
            return enabled[DATA.LANGUAGE];
        }
    });

    netInfo.push({
        Selectable: false,
        Name: "IP",
        get Description()
        {
            return ip;
        }
    });

    netInfo.push({
        Selectable: false,
        Name: "Subnet Mask",
        get Description()
        {
            return mask;
        }
    });

    netInfo.push({
        Selectable: false,
        Name: "DNS",
        get Description()
        {
            return dns;
        }
    });

    netInfo.push({
        Selectable: false,
        Name: "Gateway",
        get Description()
        {
            return gateway;
        }
    });

    DATA.DASH_STATE = "IDLE_MESSAGE_FADE_IN";
    DATA.OVSTATE = "MESSAGE_IN";
    DATA.MESSAGE_INFO =
    {
        Icon: 28,
        Title: NAME_SET1,
        BG: false,
        Type: "INFO",
        Data: netInfo,
        BACK_BTN: true,
        ENTER_BTN: false,
    };
}
function getNetEnableContextInfo()
{
    let ctx_options = [];
    ctx_options.push({ Name: TXT_ENABLED, Icon: -1 });
    ctx_options.push({ Name: TXT_DISABLED, Icon: -1 });

    // Accept Changes Function
    let _a = function(DATA, val)
    {
        if ((!DATA.NET) && (val === 0))
        {
            DATA.DASH_STATE = "SUBMENU_CONTEXT_MESSAGE_FADE_OUT";
            DATA.OVSTATE = "MESSAGE_IN";
            DATA.MESSAGE_INFO =
            {
                Icon: 28,
                Title: NAME_SET2,
                BG: false,
                Type: "TEXT",
                Text: INIT_MSG,
                BACK_BTN: false,
                ENTER_BTN: false,
                BgFunction: () =>
                {
                    NetInit();

                    const msg = (DATA.NET) ? INIT_COMPLETE_MSG : ERR_1;
                    DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Value.Default = (DATA.NET) ? 0 : 1;

                    NetCfgSave();
                    SetDashPadEvents(0);
                    DATA.DASH_MOVE_FRAME = 0;
                    DATA.MESSAGE_INFO =
                    {
                        Icon: 28,
                        Title: NAME_SET2,
                        BG: false,
                        Type: "TEXT_TO_TEXT",
                        Text: msg,
                        BACK_BTN: true,
                        ENTER_BTN: false,
                    };
                },
            };
        }
        else if ((DATA.NET) && (val === 1))
        {
            NetExit();
            NetCfgSave();
        }
    }

    return { Options: ctx_options, Default: ((DATA.NET) ? 0 : 1), ItemCount: ctx_options.length, Confirm: _a };
}

function getOptions()
{
    const opts = [];

    opts.push({
        Name: NAME_SET1,
        Description: DESC_SET1,
        Icon: 15,
        Type: "CODE",
        Value: showNetInfoMsg,
    });

    opts.push({
        Name: NAME_SET2,
        Description: DESC_SET2,
        Icon: 15,
        Type: "CONTEXT",
        Value: getNetEnableContextInfo(),
    });

    return { Options: opts, Default: 0, ItemCount: opts.length };
}

//////////////////////////////////////////////////////////////////////////
///*				   		MAIN PLUGIN DATA						  *///
///																	   ///
/// 	Here is the main info that will be retrieved by the App.   	   ///
//////////////////////////////////////////////////////////////////////////

const Info = {
    Name: NAME_MAIN,
    Description: DESC_MAIN,
    Icon: 28,
    Category: 1,
    Type: "SUBMENU",
    Value: getOptions(),
};

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
