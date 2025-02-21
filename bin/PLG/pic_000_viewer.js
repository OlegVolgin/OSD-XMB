//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NAME_MAIN = 		// Displayed name on the Main Interface
[
    "Image Viewer",
    "Image Viewer",
    "Visualizador de Imágenes",
    "Image Viewer",
    "Image Viewer",
    "Image Viewer",
    "Image Viewer",
];

const TXT_SETASBG =
[
    "Set as Wallpaper",
    "Définir comme fond d'écran",
    "Establecer como fondo",
    "Als Hintergrundbild festlegen",
    "Imposta come sfondo",
    "Instellen als achtergrond",
    "Definir como papel de parede",
]

const WORK_DIR_NAME = 	// Item 1 Name
[
    "Main Directory",
    "Répertoire principal",
    "Directorio principal",
    "Hauptverzeichnis",
    "Directory principale",
    "Hoofdmap",
    "Diretório principal",
];

const MASS_DIR_NAME = 	// Item 2 Name
[
    "USB Drive",
    "Périphérique USB",
    "Dispositivo USB",
    "USB-Gerät",
    "Dispositivo USB",
    "USB-apparaat",
    "Dispositivo USB",
];

const HDD_DIR_NAME = 	// Item 3 Name
[
    "Internal Hard Disk Drive",
    "Disque Dur Interne",
    "Disco Duro Interno",
    "Interne Festplatte",
    "Disco Rigido Interno",
    "Internal Hard Disk Drive",
    "Disco Rígido Interno",
];

//////////////////////////////////////////////////////////////////////////
///*				   		CUSTOM FUNCTIONS						  *///
//////////////////////////////////////////////////////////////////////////

function getOptionContextInfo(fullpath)
{
    let dir_options = [];
    dir_options.push({ Name: TXT_SETASBG, Icon: -1 });

    let _a = function (DATA, val)
    {
        DATA.CUSTOMBG_PATH = DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Option.FullPath;
        DATA.BGIMG = new Image(DATA.CUSTOMBG_PATH);
        DATA.BGIMG.optimize();
        DATA.BGIMG.filter = LINEAR;
        DATA.DISPLAYBG = true;
        let config = DATA.CONFIG.Get("main.cfg");
        config["customBg"] = DATA.CUSTOMBG_PATH;
        config["displayBg"] = DATA.DISPLAYBG.toString();
        DATA.CONFIG.Push("main.cfg", config);
    }

    return { Options: dir_options, Default: 0, ItemCount: dir_options.length, Confirm: _a, FullPath: fullpath };
}

function ParseDirectory(path) {
    const dir = System.listDir(path);
    let dir_options = [];

    // Separate directories and files
    const directories = dir.filter(item => item.name !== "." && item.name !== ".." && item.dir); // All directories
    const files = dir.filter(item => !item.dir); // All files

    // Sort directories and files alphabetically by name
    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    directories.forEach((item) => {
        dir_options.push({
            Path: path,
            Name: item.name,
            Description: "",
            Icon: 18,
            Type: "SUBMENU",
            get Value() { return ParseDirectory(`${this.Path}${this.Name}/`); }
        });
    });

    files.forEach((item) => {

        if (isExtensionMatching(item.name, "png", "jpg", "bmp"))
        {
            let icon = 2; // default icon for pictures
            let type = "";
            let value = {};

            dir_options.push({
                Name: item.name,
                Description: formatFileSize(item.size),
                Icon: icon,
                Type: type,
                Value: value,
                Option: getOptionContextInfo(`${path}${item.name}`),
            });
        }
    });

    return { Options: dir_options, Default: 0, ItemCount: dir_options.length, };
}

function GetExplorerOptions() {
    let options = [];

    options.push({
        Name: WORK_DIR_NAME,
        Description: "",
        Icon: 18,
        Type: "SUBMENU",
        get Value() { return ParseDirectory(`${os.getcwd()[0]}/`); }
    });

    options.push({
        Name: MASS_DIR_NAME,
        Description: "",
        Icon: 21,
        Type: "SUBMENU",
        get Value() { return ParseDirectory("mass:/"); }
    });

    return { Options: options, Default: 0, ItemCount: options.length, };
}

//////////////////////////////////////////////////////////////////////////
///*				   		MAIN PLUGIN DATA						  *///
///																	   ///
/// 	Here is the main info that will be retrieved by the App.   	   ///
//////////////////////////////////////////////////////////////////////////

const Info = {
    Name: NAME_MAIN,
    Description: "",
    Icon: 18,
    Category: 2,
    Type: "SUBMENU",
    Value: GetExplorerOptions(),
};

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
