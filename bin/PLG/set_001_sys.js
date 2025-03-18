//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NAME_MAIN =
[
    "System settings",
    "Paramètres système",
    "Ajustes de Sistema",
    "System-Einstellungen",
    "Impostazioni del sistema",
    "Systeeminstellingen",
    "Definições de Sistema",
    "Настройки системы"
];

const DESC_MAIN =
[
    "Adjusts settings for this PS2 system.",
    "Réglez les paramètres de ce système PS2.",
    "Ajusta la configuración de este sistema PS2.",
    "Einstellungen für dieses PS2-System anpassen.",
    "Regola le impostazioni di questo sistema PS2.",
    "Pas de instellingen van dit PS2-systeem aan.",
    "Ajuste as configurações deste sistema PS2.",
    "Изменяет настройки этой системы PS2."
];

const NAME_SET1 =
[
    "Language",
    "Langue",
    "Idioma",
    "Sprache",
    "Lingua",
    "Taal",
    "Idioma",
    "Язык"
];

const DESC_SET1 =
[
    "Set the system Language.",
    "Définir la langue du système",
    "Establecer el idioma del sistema.",
    "Systemsprache festlegen",
    "Seleziona la lingua del sistema",
    "Stel de systeemtaal in",
    "Definir o idioma do sistema",
    "Устанавливает язык системы."
];

const NAME_SET2 =
[
    "Confirmation Button",
    "Bouton de confirmation",
    "Botón de confirmación",
    "Bestätigungstaste",
    "Pulsante di conferma",
    "Bevestigingsknop",
    "Botão de Confirmação",
    "Кнопка подтверждения"
];

const DESC_SET2 =
[
    "Sets the confirmation button type.",
    "Définit le type de bouton de confirmation",
    "Establece el tipo de botón de confirmación.",
    "Legt den Typ der Bestätigungstaste.",
    "Imposta il tipo di pulsante di conferma.",
    "Stelt het type bevestigingsknop.",
    "Define o tipo de botão de confirmação.",
    "Устанавливает тип кнопки подтверждения"
];

const NAME_SET3 =
[
    "System Information",
    "System Information",
    "Información del Sistema",
    "System Information",
    "System Information",
    "System Information",
    "System Information",
    "Информация о системе"
];

const TYPE_1 =
[
    "Occidental",
    "Occidental",
    "Occidental",
    "Westlich",
    "Occidentale",
    "Westers",
    "Ocidental",
    "Западный"
];

const TYPE_2 =
[
    "Asian",
    "Asiatique",
    "Asiático",
    "Asiatisch",
    "Asiatico",
    "Aziatisch",
    "Asiático",
    "Азиатский"
];

const SYSINFO_MODELNAME =
[
    "Console",
    "Console",
    "Consola",
    "Console",
    "Console",
    "Console",
    "Console",
    "Консоль"
];

const SYSINFO_BDATE =
[
    "Build Date",
    "Build Date",
    "Fecha",
    "Build Date",
    "Build Date",
    "Build Date",
    "Build Date",
    "Дата сборки"
];

const SYSINFO_TYPE =
[
    "Console Type",
    "Console Type",
    "Tipo de Consola",
    "Console Type",
    "Console Type",
    "Console Type",
    "Console Type",
    "Тип консоли"
];

const SYSINFO_TYPE_C =
[
    "Retail",
    "Retail",
    "Retail",
    "Retail",
    "Retail",
    "Retail",
    "Retail",
    "Выпуск"
];

const SYSINFO_TYPE_D =
[
    "Development Kit",
    "Development Kit",
    "Kit de Desarrollo",
    "Development Kit",
    "Development Kit",
    "Development Kit",
    "Development Kit",
    "Набор разработчика"
];

const SYSINFO_BRWVER =
[
    "Browser",
    "Browser",
    "Navegador",
    "Browser",
    "Browser",
    "Browser",
    "Browser",
    "Браузер"
];

const SYSINFO_CDVER =
[
    "CD Player",
    "CD Player",
    "Reproductor de CD",
    "CD Player",
    "CD Player",
    "CD Player",
    "CD Player",
    "CD плеер"
];

//////////////////////////////////////////////////////////////////////////
///*				   		CUSTOM FUNCTIONS						  *///
//////////////////////////////////////////////////////////////////////////

function getLanguagetContextInfo()
{
    let ctx_options = [];
    ctx_options.push({ Name: "English", Icon: -1 });
    ctx_options.push({ Name: "Français", Icon: -1 });
    ctx_options.push({ Name: "Español", Icon: -1 });
    ctx_options.push({ Name: "Deutsch", Icon: -1 });
    ctx_options.push({ Name: "Italiano", Icon: -1 });
    ctx_options.push({ Name: "Nederlands", Icon: -1 });
    ctx_options.push({ Name: "Português", Icon: -1 });
    ctx_options.push({ Name: "Русский", Icon: -1});

    // Accept Changes Function
    let _a = function(DATA, val)
    {
        DATA.LANGUAGE = val;
        let config = DATA.CONFIG.Get("main.cfg");
        config["lang"] = val.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    return { Options: ctx_options, Default: DATA.LANGUAGE, ItemCount: ctx_options.length, Confirm: _a};
}

function getButtonContextInfo()
{
    let ctx_options = [];
    ctx_options.push({ Name: TYPE_1, Icon: -1 });
    ctx_options.push({ Name: TYPE_2, Icon: -1 });

    // Accept Changes Function
    let _a = function(DATA, val)
    {
        DATA.BTNTYPE = val;
        let config = DATA.CONFIG.Get("main.cfg");
        config["btnType"] = val.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    return { Options: ctx_options, Default: DATA.BTNTYPE, ItemCount: ctx_options.length, Confirm: _a};
}

function showSysInfoMsg()
{
    const test = std.open("rom0:PS1VERA", "r");

    if (test)
    {
        test.close();
        console.log("TEST FILE FOUND");
        console.log(readFileAsUtf8("rom0:PS1VERA"));
    }

    const tmp = std.open("rom0:ROMVER", "r");

    if (tmp)
    {
        const ROMVER = tmp.readAsString();
        tmp.close();

        // Extract the first four characters for the version
        const rawVersion = ROMVER.substring(0, 4);

        // Split the version into major and minor parts
        const majorVersion = rawVersion.slice(0, 2).replace(/^0/, ''); // Remove leading zero from the major version
        const minorVersion = rawVersion.slice(2); // Take the last two characters as is

        // Combine the major and minor versions into the desired format
        const formattedVersion = `${majorVersion}.${minorVersion}`;

        let ConsoleRegion = "";

        switch (ROMVER[4])
        {
            case 'X': ConsoleRegion = "Test"; break;
            case 'C': ConsoleRegion = "China"; break;
            case 'E': ConsoleRegion = "Europe"; break;
            case 'H': ConsoleRegion = "Asia"; break;
            case 'A': ConsoleRegion = "America"; break;
            case 'T':
            case 'J': ConsoleRegion = "Japan"; break;
        }

        // Extract the date portion starting from character 6
        const year = ROMVER.substring(6, 10);   // Characters 6-9 are the year
        const month = ROMVER.substring(10, 12); // Characters 10-11 are the month
        const day = ROMVER.substring(12, 14);   // Characters 12-13 are the day

        // Format the date as YYYY/MM/DD
        let formattedDate = `${day}/${month}/${year}`;

        // Get the Console Type
        let consoleType = SYSINFO_TYPE_C[DATA.LANGUAGE];

        switch (ROMVER[5])
        {
            case "C": consoleType = SYSINFO_TYPE_C[DATA.LANGUAGE]; break;
            case "D": consoleType = SYSINFO_TYPE_D[DATA.LANGUAGE]; break;
            case "Z": consoleType = "Arcade"; break;
        }

        if (std.exists("rom0:PSXVER")) { consoleType = "PSX-DVR"; }

        if (rawVersion === "0250") { consoleType = "PS2 TV"; }

        // rom1:DVDID (example 3.10M)
        const dvdId = std.open("rom1:DVDID", "r");
        if (dvdId)
        {
            const id = dvdId.readAsString();
            dvdId.close();
            switch (id[4])
            {
                case 'O': ConsoleRegion = "Oceania"; break;
                case 'R': ConsoleRegion = "Russia"; break;
                case 'M': ConsoleRegion = "Mexico"; break;
            }
        }

        // Get Extended Info if available.
        const file = std.open("rom0:EXTINFO", "r");

        if (file)
        {
            file.seek(0x10, std.SEEK_SET)
            const extDate = file.readAsString(0x0F);
            file.close()

            const extYear = extDate.substring(0, 4);
            const extMonth = extDate.substring(4, 6);
            const extDay = extDate.substring(6, 8);
            const extHour = extDate.substring(9, 11);
            const extMin = extDate.substring(11, 13);
            const extSec = extDate.substring(13, 15);

            formattedDate = `${extDay}/${extMonth}/${extYear} ${extHour}:${extMin}:${extSec}`;
        }

        let ps1ver = (ConsoleRegion === "Japan") ? "1.01" : "1.10";

        const ps1vera = std.open("rom0:PS1VERA", "r");

        if (ps1vera)
        {
            ps1vera.close();
            ps1ver = readFileAsUtf8("rom0:PS1VERA");
        }
        else
        {
            const ps1verb = std.open("rom0:PS1VER", "r");

            if (ps1verb)
            {
                ps1verb.close();
                ps1ver = readFileAsUtf8("rom0:PS1VER");
            }
        }

        let modelName = "Unknown";

        if ((rawVersion[0] === '0') && (rawVersion[1] === '1') && (rawVersion[2] === '0'))
        {
            if (rawVersion[3] === '0') { modelName = "SCPH-10000"; }
            else
            {
                const osdsys = std.open("rom0:OSDSYS", "r");

                if (osdsys)
                {
                    osdsys.seek(0x8C808, std.SEEK_SET);
                    modelName = osdsys.readAsString(17);
                    osdsys.close();
                }
            }
        }

        let osdver = "";
        const ps1id = std.open("rom0:PS1ID", "r");

        if (ps1id)
        {
            osdver = ps1id.readAsString();
            ps1id.close();
        }

        let cdver = "";
        const osdvf = std.open("rom0:OSDVER", "r");

        if (osdvf)
        {
            cdver = osdvf.readAsString(4);
            osdvf.close();

            // Split the version into major and minor parts
            const major = cdver.slice(0, 2).replace(/^0/, ''); // Remove leading zero from the major version
            const minor = cdver.slice(2); // Take the last two characters as is

            // Combine the major and minor versions into the desired format
            cdver = `${major}.${minor}`;
        }

        // Place all the Data extracted into the object
        const sysInfo = [];

        if (modelName !== "Unknown")
        {
            sysInfo.push({
                Selectable: false,
                get Name()
                {
                    return SYSINFO_MODELNAME[DATA.LANGUAGE];
                },
                get Description()
                {
                    return modelName;
                }
            });
        }

        sysInfo.push({
            Selectable: false,
            Name: "ROMVER",
            get Description() {
                return formattedVersion;
            }
        });

        if (osdver !== "")
        {
            sysInfo.push({
                Selectable: false,
                get Name()
                {
                    return SYSINFO_BRWVER[DATA.LANGUAGE];
                },
                get Description()
                {
                    return osdver;
                }
            });
        }

        if (cdver !== "")
        {
            sysInfo.push({
                Selectable: false,
                get Name()
                {
                    return SYSINFO_CDVER[DATA.LANGUAGE];
                },
                get Description()
                {
                    return cdver;
                }
            });
        }

        sysInfo.push({
            Selectable: false,
            Name: "Playstation Driver",
            get Description()
            {
                return ps1ver;
            }
        });

        sysInfo.push({
            Selectable: false,
            Name: "Region",
            get Description()
            {
                return ConsoleRegion;
            }
        });

        sysInfo.push({
            Selectable: false,
            get Name() {
                return SYSINFO_TYPE[DATA.LANGUAGE];
            },
            get Description() {
                return consoleType;
            }
        });

        sysInfo.push({
            Selectable: false,
            get Name() {
                return SYSINFO_BDATE[DATA.LANGUAGE];
            },
            get Description() {
                return formattedDate;
            }
        });

        DATA.DASH_STATE = "IDLE_MESSAGE_FADE_IN";
        DATA.OVSTATE = "MESSAGE_IN";
        DATA.MESSAGE_INFO =
        {
            Icon: 8,
            Title: NAME_SET3,
            BG: false,
            Type: "INFO",
            Data: sysInfo,
            BACK_BTN: true,
            ENTER_BTN: false,
        };
    }
}

function getOptions()
{
    let options = [];

    options.push({
        Name: NAME_SET1,
        Description: DESC_SET1,
        Icon: 15,
        Type: "CONTEXT",
        Value: getLanguagetContextInfo(),
    });

    options.push({
        Name: NAME_SET2,
        Description: DESC_SET2,
        Icon: 15,
        Type: "CONTEXT",
        Value: getButtonContextInfo(),
    });

    options.push({
        Name: NAME_SET3,
        Description: "",
        Icon: 15,
        Type: "CODE",
        Value: showSysInfoMsg,
    });

    return { Options: options, Default: 0, ItemCount: options.length };
}

//////////////////////////////////////////////////////////////////////////
///*				   		MAIN PLUGIN DATA						  *///
///																	   ///
/// 	Here is the main info that will be retrieved by the App.   	   ///
//////////////////////////////////////////////////////////////////////////

const Info = {
    Name: NAME_MAIN,
    Description: DESC_MAIN,
    Icon: 8,
    Category: 1,
    Type: "SUBMENU",
    Value: getOptions(),
};

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
