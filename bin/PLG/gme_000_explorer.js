//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NAME_MAIN = 		// Displayed name on the Main Interface
[
    "File Explorer",
    "Explorateur de fichiers",
    "Explorador de Archivos",
    "Datei-Explorer",
    "Esplora file",
    "Bestandsverkenner",
    "Explorador de arquivos",
];

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

function ParseDirectory(path)
{
    const dir = System.listDir(path);
    let dir_options = [];

    // Separate directories and files
    let directories = dir.filter(item => item.name !== "." && item.name !== ".." && item.dir); // All directories
    let files = dir.filter(item => !item.dir); // All files

    // Sort directories and files alphabetically by name
    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    directories.forEach((item) =>
    {
        dir_options.push({
            Path: path,
            Name: item.name,
            Description: "",
            Icon: 18,
            Type: "SUBMENU",
            get Value() { return ParseDirectory(`${this.Path}${this.Name}/`); }
        });
    });

    files.forEach((item) =>
    {
        let icon = 24; // default icon for files
        let type = "";
        let value = {};

        switch(getFileExtension(item.name).toLowerCase())
        {
            case "vcd": icon = 25; break;
            case "iso": icon = 26; break;
            case "elf": icon = 27; type = "ELF"; value = { Path: (`${path}${item.name}`), Args: [], }; break;
            case "png":
            case "jpg":
            case "bmp": icon = 2; break;
            case "mp3":
            case "wav":
            case "ogg": icon = 3; break;
            case "mp4":
            case "mkv":
            case "avi": icon = 4; break;
        }

        dir_options.push({ Name: item.name, Description: formatFileSize(item.size), Icon: icon, Type: type, Value: value, });
    });

    return { Options: dir_options, Default:0, ItemCount: dir_options.length, };
}

function getHDDPartitions()
{
    let dir_options = [];
    let partitions = os.readdir("hdd0:")[0];
    partitions = [...new Set(partitions)];
    partitions.sort((a, b) => a.localeCompare(b));

    partitions.forEach((item) =>
    {
        dir_options.push({
            Name: item,
            Description: "",
            Icon: 18,
            Type: "",
            get Value() { return {}; }  // Placeholder for when HDD partitions are supported
        });
    });

    return { Options: dir_options, Default: 0, ItemCount: dir_options.length, };
}

function GetExplorerOptions()
{
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

    if (os.readdir("hdd0:")[0].length > 0)
    {
        options.push({
            Name: HDD_DIR_NAME,
            Description: "",
            Icon: 29,
            Type: "SUBMENU",
            get Value() { return getHDDPartitions(); }
        });
    }

    for (let i = 0; i < 2; i++)
    {
        const hasContent = os.readdir(`mmce${i.toString()}:/`)[0].length > 0;
        if (!hasContent) continue;

        options.push({
            Name: `MMCE ${i.toString()}`,
            Description: "",
            Icon: 21,
            Type: "SUBMENU",
            get Value()
            {
                return ParseDirectory(`mmce${i.toString()}:/`);
            }
        });
    }

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
    Category: 5,
    Type: "SUBMENU",
    Value: GetExplorerOptions(),
};

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
