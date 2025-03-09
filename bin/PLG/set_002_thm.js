//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NAME_MAIN =
[
    "Theme Settings",
    "Paramètres de thème",
    "Ajustes de Tema",
    "Design-Einstellungen",
    "Impostazioni del tema",
    "Thema-instellingen",
    "Configurações de tema",
];

const DESC_MAIN =
[
    "Adjust settings related to the appearance of the XMB Screen.",
    "Réglez les paramètres liés à l'apparence de l'écran XMB.",
    "Ajusta la apariencia de la pantalla XMB.",
    "Einstellungen für das Erscheinungsbild des XMB-Bildschirms anpassen.",
    "Regola le impostazioni relative all'aspetto dello schermo XMB.",
    "Pas instellingen aan die verband houden met het uiterlijk van het XMB-scherm.",
    "Ajuste as configurações relacionadas à aparência da tela XMB.",
];

const NAME_SET1 =
[
    "Theme",
    "Thème",
    "Tema",
    "Thema",
    "Tema",
    "Thema",
    "Tema",
];

const DESC_SET1 =
[
    "Sets the interface style.",
    "Définir le style de l'interface.",
    "Establecer el estilo de la interfaz.",
    "Den Schnittstellenstil festlegen.",
    "Seleziona lo stile dell'interfaccia.",
    "Stel de interface-stijl in.",
    "Definir o estilo da interface.",
];

const NAME_SET2 =
[
    "Color",
    "Couleur",
    "Color",
    "Farbe",
    "Colore",
    "Kleur",
    "Cor",
];

const DESC_SET2 =
[
    "Sets the background color.",
    "Définir la couleur de fond.",
    "Establecer el color de fondo.",
    "Hintergrundfarbe festlegen.",
    "Seleziona il colore dello sfondo.",
    "Stel de achtergrondkleur in.",
    "Definir a cor de fundo.",
];

const NAME_SET3 =
[
    "Background",
    "Arrière-plan",
    "Fondo",
    "Hintergrundbild",
    "Sfondo",
    "Achtergrond",
    "Fundo",
];

const DESC_SET3 =
[
    "Set the interface background.",
    "Définir l'arrière-plan de l'interface.",
    "Establecer el fondo de la interfaz.",
    "Den Hintergrund der Schnittstelle festlegen.",
    "Seleziona lo sfondo dell'interfaccia.",
    "Stel de achtergrond van de interface in.",
    "Definir o fundo da interface.",
];

const NAME_SET4 =
[
    "Waves",
    "Waves",
    "Ondas",
    "Waves",
    "Waves",
    "Waves",
    "Waves",
];

const DESC_SET4 =
[
    "Set the Background Waves On or Off.",
    "Set the Background Waves On or Off.",
    "Habilita o Deshabilita las ondas de fondo.",
    "Set the Background Waves On or Off.",
    "Set the Background Waves On or Off.",
    "Set the Background Waves On or Off.",
    "Set the Background Waves On or Off.",
];

const thmSett_NoWpSet =
[
    "There is no wallpaper set. \nGo to [Photo], open an image, and then select [Set as Wallpaper] from the control panel to save the image.",
    "Aucun fond d'écran défini. \nAllez dans [Photo], ouvrez une image, et sélectionnez [Définir comme fond d'écran].",
    "No hay fondo de pantalla. \nVe a [Foto], abre una imagen y selecciona [Establecer como fondo].",
    "Kein Hintergrundbild gesetzt. \nNavigiere zu [Foto], öffne ein Bild und wähle [Als Hintergrundbild festlegen].",
    "Nessuno sfondo impostato. \nVai in [Foto], apri un'immagine e seleziona [Imposta come sfondo].",
    "Geen achtergrond ingesteld. \nGa naar [Foto], open een afbeelding en kies [Instellen als achtergrond].",
    "Nenhum papel de parede definido. \nVá para [Foto], abra uma imagem e escolha [Definir como papel de parede]."
];

const setting1 =
[
    "Original",
    "Original",
    "Original",
    "Original",
    "Originale",
    "Origineel",
    "Original",
];

const setting2 =
[
    "Wallpaper",
    "Fond d'écran",
    "Fondo de pantalla",
    "Hintergrundbild",
    "Sfondo personalizzato",
    "Achtergrondafbeelding",
    "Fundo personalizado",
];

const thmSett_Wait =
[
    "Please wait...",
    "Veuillez patienter...",
    "Por favor espere...",
    "Bitte warten...",
    "Attendere prego...",
    "Even geduld...",
    "Aguarde...",
];

//////////////////////////////////////////////////////////////////////////
///*				   		CUSTOM FUNCTIONS						  *///
//////////////////////////////////////////////////////////////////////////

function GetThemeContextInfo()
{
    const CURTHEME = getFolderNameFromPath(DATA.THEME_PATH);
    const listDir = System.listDir("/THM/");

    let defItem = 0;
    let dir_options = [];

    dir_options.push
    ({
        Name: "Original",
        Icon: -1
    });

    const sortedDirectories = listDir
    .filter((item) => item.name !== "." && item.name !== ".." && item.name !== "Original" && item.dir) // Exclude "." and ".." and keep only directories
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    // Loop through sortedDirectories and collect directories into the desired structure
    sortedDirectories.forEach((item) =>
    {
        const dirFiles = os.readdir(`./THM/${item.name}/`)[0];
        const ico = (dirFiles.includes("thmico.png")) ? new Image(`./THM/${item.name}/thmico.png`, RAM, async_list) : -1;
        dir_options.push
        ({
            Name: item.name,
            Icon: ico,
        });

        if (dirFiles.includes("thmprw.png")) { dir_options[dir_options.length - 1].PreviewImage = `./THM/${item.name}/thmprw.png`; }

        if (item.name == CURTHEME) { defItem = dir_options.length - 1; }
    });

    let _a = function (DATA, val)
    {
        DATA.DASH_STATE = "SUBMENU_CONTEXT_MESSAGE_FADE_OUT";
        DATA.OVSTATE = "MESSAGE_IN";
        DATA.MESSAGE_INFO =
        {
            Icon: 9,
            Title: NAME_SET1,
            BG: false,
            Type: "TEXT",
            Text: thmSett_Wait,
            BACK_BTN: false,
            ENTER_BTN: false,
            BgFunction: () =>
            {
                let config = DATA.CONFIG.Get("main.cfg");
                if (DATA.THEME_PATH !== `THM/${config["Theme"]}/`)
                {
                    DATA.THEME_PATH = `THM/${config["Theme"]}/`;

                    if (os.readdir(DATA.THEME_PATH)[0].includes("thm.js"))
                    {
                        std.loadScript(`${DATA.THEME_PATH}thm.js`);
                    }

                    let bgComplete = false;
                    let imgsLoaded = false;
                    let fntLoaded = false;
                    let sndLoaded = false;

                    loaded_icons = 0;

                    if (config["Theme"] === "Original")
                    {
                        DATA.DISPLAYBG = false;
                        DATA.BGIMG = false;
                        DATA.BGIMGA = 0;
                    }

                    let intervalID = os.setInterval(() =>
                    {
                        let finished = false;

                        if (DATA.DISPLAYBG) { DATA.BGIMGA += 12; if (DATA.BGIMGA >= 128) { bgComplete = true; } }
                        else { bgComplete = true; }

                        if (imgsLoaded === false)
                        {
                            if ((os.readdir(`${DATA.THEME_PATH}`)[0].includes("icons")))
                            {
                                if (loaded_icons < dash_icons_names.length)
                                {
                                    if (os.readdir(`${DATA.THEME_PATH}icons/`)[0].includes(`${dash_icons_names[loaded_icons]}`))
                                    {
                                        let icon = new Image(`${DATA.THEME_PATH}icons/${dash_icons_names[loaded_icons]}`);
                                        icon.optimize();
                                        icon.filter = LINEAR;
                                        dash_icons[loaded_icons] = icon;
                                    }

                                    loaded_icons++;
                                }
                                else
                                {
                                    imgsLoaded = true;
                                }
                            }
                            else
                            {
                                loaded_icons = dash_icons_names.length;
                                imgsLoaded = true;
                            }
                        }

                        if (fntLoaded === false)
                        {
                            // Reload Font

                            if ((os.readdir(`${DATA.THEME_PATH}`)[0].includes("text")) && (os.readdir(`${DATA.THEME_PATH}text/`)[0].includes("font.ttf")))
                            {
                                font_m = new Font(`${DATA.THEME_PATH}text/font.ttf`);
                                font_s = new Font(`${DATA.THEME_PATH}text/font.ttf`);
                                font_ss = new Font(`${DATA.THEME_PATH}text/font.ttf`);
                                font_m.scale = 0.65f;
                                font_s.scale = 0.5f;
                                font_ss.scale = 0.44f;
                            }

                            fntLoaded = true;
                        }

                        if (sndLoaded === false)
                        {
                            // Pending

                            sndLoaded = true;
                        }

                        if ((bgComplete) && (imgsLoaded) && (fntLoaded) && (sndLoaded)) { finished = true; }

                        if (finished)
                        {
                            DATA.OVSTATE = "MESSAGE_OUT";
                            DATA.DASH_STATE = "SUBMENU_MESSAGE_FADE_IN";
                            DATA.DASH_MOVE_FRAME = 0;
                            SetDashPadEvents(0);
                            os.clearInterval(intervalID);
                        }
                    }, 0, );
                }
            },
        };

        let config = DATA.CONFIG.Get("main.cfg");
        config["Theme"] = DASH_CTX[DATA.DASH_CURCTXLVL].Options[DASH_CTX[DATA.DASH_CURCTXLVL].Selected].Name;
        DATA.CONFIG.Push("main.cfg", config);
    };

    return { Options: dir_options, Default: defItem, ItemCount: dir_options.length, Confirm: _a };
}

function GetThemeColorContextInfo()
{
    let dir_options = [];
    dir_options.push({ Name: setting1, Icon: -1 });

    for (let i = 1; i < 14; i++)
    {
        dir_options.push({ Name: "", Icon: colr_icons[i - 1], });
    }

    // Preview Changes Function
    let _p = function(DATA, val)
    {
        let OSDATE = new Date();
        DATA.BGTMP = val;
        DATA.BGCOL = (val == 0) ? (OSDATE.getMonth() + 1) : val;
        DATA.BGSWITCH = true;
        DATA.BGFRAME = 0;
    }

    // Accept Changes Function
    let _a = function(DATA, val)
    {
        let OSDATE = new Date();
        DATA.BGVAL = val;
        DATA.BGTMP = val;
        DATA.BGCOL = (val == 0) ? (OSDATE.getMonth() + 1) : val;
        DATA.BGSWITCH = true;
        DATA.BGFRAME = 0;
        let config = DATA.CONFIG.Get("main.cfg");
        config["BgColor"] = val.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    // Cancel Changes Function
    let _c = function(DATA, val)
    {
        let OSDATE = new Date();
        DATA.BGTMP = DATA.BGVAL;
        DATA.BGCOL = (DATA.BGVAL == 0) ? (OSDATE.getMonth() + 1) : DATA.BGVAL;
        DATA.BGSWITCH = true;
        DATA.BGFRAME = 0;
    }

    return { Options: dir_options, Default: DATA.BGVAL, ItemCount: dir_options.length, Preview: _p, Confirm: _a, Cancel: _c, };
}

function GetThemeBackgroundContextInfo()
{
    let dir_options = [];
    dir_options.push({ Name: setting1, Icon: -1 });
    dir_options.push({ Name: setting2, Icon: -1 });

    let _a = function(DATA, val)
    {
        console.log(`THMSET: Background Image Function.`);

        if ((val == 1) && (!DATA.BGIMG)) {

            DATA.DISPLAYBG = false;

            console.log(`THMSET: Background Image not set. Showing Message.`);

            DATA.DASH_STATE = "SUBMENU_CONTEXT_MESSAGE_FADE_OUT";
            DATA.OVSTATE = "MESSAGE_IN";
            DATA.MESSAGE_INFO =
            {
                Icon: 9,
                Title: setting2,
                BG: true,
                Type: "TEXT",
                Text: thmSett_NoWpSet,
                BACK_BTN: true,
                ENTER_BTN: false,
            };

            return false;
        }
        else if ((val == 1) && (DATA.BGIMG))
        {
            DATA.DISPLAYBG = true;
        }
        else if (val == 0) {
            DATA.DISPLAYBG = false;
        }

        let config = DATA.CONFIG.Get("main.cfg");
        config["displayBg"] = DATA.DISPLAYBG.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    return {
        Options: dir_options,
        ItemCount: dir_options.length,
        Confirm: _a,
        get Default() { return ((!DATA.DISPLAYBG) ? 0 : 1); }
    };
}

function GetThemeWaveContextInfo()
{
    let dir_options = [];
    dir_options.push({ Name: TXT_YES, Icon: -1 });
    dir_options.push({ Name: TXT_NO, Icon: -1 });

    let _a = function(DATA, val)
    {
        DATA.BGWAVES = (val == 0);
        let config = DATA.CONFIG.Get("main.cfg");
        config["waves"] = DATA.BGWAVES.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    return { Options: dir_options, Default: ((DATA.BGWAVES) ? 0 : 1), ItemCount: dir_options.length, Confirm: _a, };
}

function getOptions()
{
    const opts = [];

    opts.push({
        Name: NAME_SET1,
        Description: DESC_SET1,
        Icon: 15,
        Type: "CONTEXT",
        Value: GetThemeContextInfo(),
    });

    opts.push({
        Name: NAME_SET2,
        Description: DESC_SET2,
        Icon: 15,
        Type: "CONTEXT",
        Value: GetThemeColorContextInfo(),
    });

    opts.push({
        Name: NAME_SET3,
        Description: DESC_SET3,
        Icon: 15,
        Type: "CONTEXT",
        Value: GetThemeBackgroundContextInfo(),
    });

    opts.push({
        Name: NAME_SET4,
        Description: DESC_SET4,
        Icon: 15,
        Type: "CONTEXT",
        Value: GetThemeWaveContextInfo(),
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
    Icon: 9,
    Category: 1,
    Type: "SUBMENU",
    Value: getOptions(),
};

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
