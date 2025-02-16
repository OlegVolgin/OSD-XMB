//////////////////////////////////////////////////////////////////////////
///*				   		 ENCLOSE START							  *///
//////////////////////////////////////////////////////////////////////////

export const Plugin = (() => { 	// DO NOT REMOVE, Encloses plugin on a local scope //

//////////////////////////////////////////////////////////////////////////
///*				   		 CUSTOM STRINGS							  *///
//////////////////////////////////////////////////////////////////////////

const NeutrinoSettingNames =
[
    "Virtual Memory Card 1",
    "Virtual Memory Card 2",
    "IOP: Fast reads",
    "IOP: Sync reads",
    "IOP: Emulate DVD-DL",
    "IOP: Fix game buffer overrun",
    "EE : Unhook syscalls"
];

//////////////////////////////////////////////////////////////////////////
///*				   		CUSTOM FUNCTIONS						  *///
//////////////////////////////////////////////////////////////////////////

let bootDev = (os.getcwd()[0].substring(0,3) === "pfs") ? "ata" : "usb";
let bootFs = (os.getcwd()[0].substring(0,3) === "pfs") ? "hdl" : "exfat";
let cwd = "mc0:/neutrino";
let gameList = [];
let devices = [ `${bootDev}`, "usb", "mx4sio", "ata", "udpbd", "mmce", "mmce" ];
let roots = [ `${os.getcwd()[0]}/`, "mass:/", "mx4sio:/", "hdd0:/", "udpbd:/", "mmce0:/", "mmce1:/" ];
let fsmodes = [ "exfat", "exfat", "exfat", "hdl", "bd", "exfat", "exfat" ];

// For cases when the executable is placed directly at root.
let basepath = `${os.getcwd()[0]}/`;

if (basepath.endsWith("//"))
{
    basepath = basepath.slice(0, -1);
}

const elfPath = `${basepath}APPS/neutrino/`;
const cfgPath = "neutrino.cfg";

function SaveLastPlayedAndGetExArgs()
{
    if (DATA.GAMESETS.LOGO) { DASH_SEL.Value.Args.push('-logo'); }
    if (DATA.GAMESETS.DBC) { DASH_SEL.Value.Args.push('-dbc'); }
    const config = DATA.CONFIG.Get(`${DASH_SEL.Description}.cfg`);

    if (("gc" in config) && (config["gc"] !== "")) { DASH_SEL.Value.Args.push(`-gc=${config["gc"]}`); }
    if (("VMC0" in config) && (config["VMC0"] === "true")) { DASH_SEL.Value.Args.push(`-mc0=${basepath}VMC/${DASH_SEL.Description}_0.vmc`); }
    if (("VMC1" in config) && (config["VMC1"] === "true")) { DASH_SEL.Value.Args.push(`-mc1=${basepath}VMC/${DASH_SEL.Description}_1.vmc`); }

    // Save Last Played
    const cfg = DATA.CONFIG.Get(cfgPath);
    cfg["lastPlayed"] = DASH_SEL.Name;
    DATA.CONFIG.Set(cfgPath, cfg);
}

function getGameSettings(code)
{
    const config = DATA.CONFIG.Get(`${code}.cfg`);
    let settings = [ false, false, false, false, false, false, false ];
    if ("VMC0" in config) { settings[0] = (config["VMC0"] === "true"); }
    if ("VMC1" in config) { settings[1] = (config["VMC1"] === "true"); }
    if ("gc" in config)
    {
        const gc = config["gc"];
        settings[2] = /0/.test(gc);
        settings[3] = /2/.test(gc);
        settings[4] = /5/.test(gc);
        settings[5] = /7/.test(gc);
        settings[6] = /3/.test(gc);
    }

    return settings;
}

function getOptionContextInfo()
{
    let dir_options = [];
    dir_options.push({ Name: TXT_INFO, Icon: -1 });

    let _a = function(DATA, val)
    {
        console.log("NEUTSETTS: Get Current Game Settings");
        const gameData = [];
        const currSett = getGameSettings(DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Description);

        console.log("NEUTSETTS: Set Game Title");
        gameData.push({
            Selectable: false,
            get Name() {
                return TXT_TITLE[DATA.LANGUAGE];
            },
            get Description() {
                return DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Name;
            }
        });

        console.log("NEUTSETTS: Set Neutrino Setting Options");
        for (let i = 0; i < NeutrinoSettingNames.length; i++)
        {
            gameData.push({
                Selectable: true,
                Name: NeutrinoSettingNames[i],
                Selected: (currSett[i]) ? 1 : 0,
                Count: 2,
                get Description() {
                    return ((this.Selected === 0) ? TXT_NO[DATA.LANGUAGE] : TXT_YES[DATA.LANGUAGE]);
                }
            });
        }

        console.log("NEUTSETTS: Set Confirm Function");
        let saveGameSettings = function()
        {
            const code = DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Description;
            const config = DATA.CONFIG.Get(`${code}.cfg`);
            config["VMC0"] = (DATA.MESSAGE_INFO.Data[1].Selected === 1).toString();
            config["VMC1"] = (DATA.MESSAGE_INFO.Data[2].Selected === 1).toString();
            let gcModes = "";
            if (DATA.MESSAGE_INFO.Data[3].Selected === 1) { gcModes += "0"; }
            if (DATA.MESSAGE_INFO.Data[4].Selected === 1) { gcModes += "2"; }
            if (DATA.MESSAGE_INFO.Data[5].Selected === 1) { gcModes += "5"; }
            if (DATA.MESSAGE_INFO.Data[6].Selected === 1) { gcModes += "7"; }
            if (DATA.MESSAGE_INFO.Data[7].Selected === 1) { gcModes += "3"; }
            config["gc"] = gcModes;
            DATA.CONFIG.Push(`${DASH_SUB[DATA.DASH_CURSUB].Options[DATA.DASH_CURSUBOPT].Description}.cfg`, config);

            let setCopyMessage = false;
            const vmcfiles = os.readdir(`${basepath}VMC/`)[0];
            for (let i = 0; i < 2; i++)
            {
                if ((DATA.MESSAGE_INFO.Data[i + 1].Selected === 1) && (!vmcfiles.includes(`${code}_${i}.vmc`)))
                {
                    threadCopyPush(`${basepath}VMC/blank.vmc`, `${basepath}VMC/${code}_${i}.vmc`);
                    setCopyMessage = true;
                }
            }

            if (setCopyMessage)
            {
                DATA.OVSTATE = "MESSAGE_IDLE";
                DATA.DASH_STATE = "SUBMENU_MESSAGE_IDLE";
                DATA.MESSAGE_INFO =
                {
                    Icon: -1,
                    Title: "",
                    BG: false,
                    Type: "INFO_TO_PROGRESS",
                    BACK_BTN: false,
                    ENTER_BTN: false,
                    Count: DATA.CPYQUEUE.length,
                    Done: 0,
                    get Progress()
                    {
                        this.Done = this.Count - DATA.CPYQUEUE.length;
                        const progress = System.getFileProgress();
                        return Math.round((progress.current / progress.final) * 100);
                    }
                };
            }
        };

        console.log("NEUTSETTS: Set Message Screen Parameters");
        DATA.DASH_STATE = "SUBMENU_CONTEXT_MESSAGE_FADE_OUT";
        DATA.OVSTATE = "MESSAGE_IN";
        DATA.MESSAGE_INFO =
        {
            Icon: -1,
            Title: "",
            BG: false,
            Type: "INFO",
            Data: gameData,
            BACK_BTN: true,
            ENTER_BTN: true,
            Confirm: saveGameSettings,
        };
    }

    return { Options: dir_options, Default: 0, ItemCount: dir_options.length, Confirm: _a, };
}

function getISOGameCode(isoPath, isoSize)
{
    const sectorSize = 2048; // Standard ISO sector size
    const RET = { success: false, code: "ERR" };

    // Open the file in read mode
    const file = std.open(isoPath, "r");
    if (!file)
    {
        console.log(`Could not open file: ${isoPath}`);
        return RET;
    }

    // Seek to the Primary Volume Descriptor (sector 16 in ISO 9660)
    file.seek(16 * sectorSize, std.SEEK_SET);
    const pvd = file.readAsString(sectorSize);

    // Check for "CD001" magic string in PVD
    if (!pvd || pvd.substring(1, 6) !== "CD001")
    {
        file.close();
        logl(`${getGameName(isoPath)} Primary Volume Descriptor (CD001) not found.`);
        console.log("Primary Volume Descriptor (CD001) not found");
        return RET;
    }

    // Extract the root directory offset and size
    file.seek((16 * sectorSize) + 158, std.SEEK_SET);
    const rootDirOffset = sectorSize * (file.getByte() | (file.getByte() << 8) | (file.getByte() << 16) | (file.getByte() << 24));

    file.seek(4, std.SEEK_CUR);
    const rootDirSize = (file.getByte() | (file.getByte() << 8) | (file.getByte() << 16) | (file.getByte() << 24));

    // Read the root directory
    if ((rootDirOffset > isoSize) || (rootDirSize > sectorSize))
    {
        file.close();
        logl(`${getGameName(isoPath)} ISO Read Error: Invalid Root Data.`);
        console.log("ISO Read Error: Invalid Root Data");
        return RET;
    }

    file.seek(rootDirOffset, std.SEEK_SET);
    const rootDir = file.readAsString(rootDirSize);
    file.close();

    if ((!rootDir) || (rootDir.length === 0))
    {
        logl(`${getGameName(isoPath)} Root directory not found or is empty`);
        console.log("Root directory not found or is empty");
        return RET;
    }

    // Match file name pattern
    const match = rootDir.match(/[A-Z]{4}[-_][0-9]{3}\.[0-9]{2}/);
    if (match) {
        RET.success = true;
        RET.code = match[0];
    }

    return RET;
}

function ParseDirectory(path, device, fs)
{
    let dir = System.listDir(path);

    if (dir.length < 1) { return; }

    const cfg = DATA.CONFIG.Get(cfgPath);

    dir.forEach((item) =>
    {
        if ((!item.dir) && (item.name.toLowerCase().endsWith(".iso")))
        {
            // Get Game Item Info
            let title = getGameName(item.name);
            let type = "ELF";

            // Set Launch Settings
            let args = [ `-cwd=${cwd}`, `-bsd=${device}`, `-bsdfs=${fs}`, `-dvd=${getRootName(path)}:${getPathWithoutRoot(path)}${item.name}`, `-mt=${getFolderNameFromPath(path).toLowerCase()}` ];
            let value = { Path: `${elfPath}neutrino.elf`, Args: args, Code: SaveLastPlayedAndGetExArgs };

            // Get Game Code
            let gameCode = "";

            if (title in cfg) { gameCode = cfg[title]; }
            else
            {
                gameCode = getGameCodeFromOldFormatName(item.name);
                if (gameCode === "")
                {
                    let retval = getISOGameCode(`${path}${item.name}`, item.size);
                    if (retval.success)
                    {
                        gameCode = retval.code;
                        cfg[title] = gameCode;
                        DATA.CONFIG.Push(cfgPath, cfg);
                    }
                }
                else
                {
                    cfg[title] = gameCode;
                    DATA.CONFIG.Push(cfgPath, cfg);
                }
            }

            // Add ART
            let ico = (() => { return dash_icons[26]; });
            const icoFile = findICO(gameCode);
            if (icoFile !== "") { ico = new Image(icoFile, RAM, async_list); }

            gameList.push({
                Name: title,
                Description: gameCode,
                Icon: -1,
                Type: type,
                Option: getOptionContextInfo(),
                Value: value,
                Art: { ICO: ico },
                get CustomIcon()
                {
                    if (typeof this.Art.ICO === "function") { return this.Art.ICO(); }
                    return this.Art.ICO;
                }
            });

            const bgFile = findBG(gameCode);
            if (bgFile !== "") { gameList[gameList.length - 1].CustomBG = bgFile; }
        }
    });
}

function getGames()
{
    // Scan MC0 for neutrino folder
    if (!os.readdir("mc0:/")[0].includes("neutrino"))
    {
        // Scan MC1 for neutrino folder
        if (!os.readdir("mc1:/")[0].includes("neutrino")) { return { Options: {}, Default: 0, ItemCount: 0 }; }

        // Update assets folder
        cwd = "mc1:/neutrino";
    }

    let lastPlayed = 0;
    let scannedPaths = [];

    for (let i = 0; i < devices.length; i++)
    {
        // If ends with double slashes, trim.
        if (roots[i].endsWith("//"))
        {
            roots[i] = roots[i].slice(0, -1);
        }

        // if Path was already scanned, skip it
        if ((scannedPaths.length > 0) && (scannedPaths.includes(roots[i])))
        {
            continue;
        }

        // Scan DVD directory if it exists
        if (os.readdir(roots[i])[0].includes("DVD"))
        {
            ParseDirectory(`${roots[i]}DVD/`, devices[i], fsmodes[i]);
        }

        // Scan CD directory if it exists
        if (os.readdir(roots[i])[0].includes("CD"))
        {
            ParseDirectory(`${roots[i]}CD/`, devices[i], fsmodes[i]);
        }

        // Add path to scanned Paths
        scannedPaths.push(roots[i]);
    }

    if (gameList.length > 1) { gameList.sort((a, b) => a.Name.localeCompare(b.Name)); }

    const cfg = DATA.CONFIG.Get(cfgPath);

    if ("lastPlayed" in cfg)
    {
        const title = cfg["lastPlayed"];
        const index = gameList.findIndex(item => item.Name === title);
        if (index > -1) { lastPlayed = index; }
    }

    return { Options: gameList, Default: lastPlayed, ItemCount: gameList.length };
}

function getDesc()
{
    const titleString = gameList.length.toString();
    const DESC_MAIN = new Array
    (
        `${titleString} ${TXT_TITLES[0]}`,
        `${titleString} ${TXT_TITLES[1]}`,
        `${titleString} ${TXT_TITLES[2]}`,
        `${titleString} ${TXT_TITLES[3]}`,
        `${titleString} ${TXT_TITLES[4]}`,
        `${titleString} ${TXT_TITLES[5]}`,
        `${titleString} ${TXT_TITLES[6]}`,
    );

    return DESC_MAIN;
}

//////////////////////////////////////////////////////////////////////////
///*				   		MAIN PLUGIN DATA						  *///
///																	   ///
/// 	Here is the main info that will be retrieved by the App.   	   ///
//////////////////////////////////////////////////////////////////////////

if (!os.readdir(elfPath)[0].includes("neutrino.elf")) { return {}; }

const Info = {
    Name: "Playstation 2",
    Icon: 18,
    Category: 5,
    Type: "SUBMENU",
    Value: getGames(),
    Description: getDesc(),
    Safe: true,
};

if (Info.Value.ItemCount < 1) { return {}; }

return Info;

//////////////////////////////////////////////////////////////////////////
///*				   		   ENCLOSE END							  *///
//////////////////////////////////////////////////////////////////////////

})(); // DO NOT REMOVE, Encloses plugin on a local scope //
