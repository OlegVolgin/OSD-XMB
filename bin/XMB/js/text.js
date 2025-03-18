//////////////////////////////////////////////////////////////////////////
///*				   			   TEXT								  *///
/// 				   		  										   ///
///		Here are all the localization strings and Text Rendering	   ///
///		functions, as well as the Font initialization.				   ///
/// 				   		  										   ///
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
///*				   	   LOCALIZATION STRINGS						  *///
//////////////////////////////////////////////////////////////////////////

// Category Names, one for each category on the 7 different languages.

const CAT_NAMES = [];
CAT_NAMES.push([ "User", "Utilisateur", "Usuario", "Benutzer", "Utente", "Gebruiker", "Usuário", "Пользователь" ]);
CAT_NAMES.push([ "Settings", "Paramètres", "Opciones", "Optionen", "Opzioni", "Opties", "Opções", "Настройки"]);
CAT_NAMES.push([ "Photo", "Photo", "Foto", "Foto", "Foto", "Foto", "Fotografia", "Фото" ]);
CAT_NAMES.push([ "Music", "Musique", "Música", "Musik", "Musica", "Muziek", "Música", "Фото" ]);
CAT_NAMES.push([ "Video", "Video", "Video", "Video", "Video", "Video", "Video", "Видео" ]);
CAT_NAMES.push([ "Game", "Jeu", "Juego", "Spiel", "Giochi", "Spel", "Jogo", "Игра" ]);
CAT_NAMES.push([ "Network", "Réseau", "Red", "Netzwerk", "Rete", "Netwerk", "Rede", "Сеть" ]);

// The Boot Epilepsy Warning Text.

const BOOT_WARNING_ARRAY =
[
    "PHOTOSENSITIVE EPILEPSY\nIF YOU HAVE A HISTORY OF EPILEPSY OR SEIZURES, CONSULT A DOCTOR\nBEFORE USE. CERTAIN PATTERNS MAY TRIGGER SEIZURES WITH NO PRIOR HISTORY. BEFORE USING THIS PRODUCT, CAREFULLY READ THE INSTRUCTION MANUAL.",
    "ÉPILEPSIE PHOTOSENSIBLE\nSI VOUS AVEZ DES ANTÉCÉDENTS D'ÉPILEPSIE OU DE CRISES, CONSULTEZ UN MÉDECIN AVANT UTILISATION. CERTAINS MOTIFS PEUVENT DÉCLENCHER DES CRISES SANS ANTÉCÉDENTS. AVANT D'UTILISER CE PRODUIT, LISEZ ATTENTIVEMENT LE MANUEL D'INSTRUCTIONS.",
    "EPILEPSIA FOTOSENSIBLE\nSI TIENE ANTECEDENTES DE EPILEPSIA O CONVULSIONES, CONSULTE A UN MÉDICO ANTES DE USARLO. CIERTOS PATRONES PUEDEN PROVOCAR CONVULSIONES SIN ANTECEDENTES PREVIOS. ANTES DE USAR ESTE PRODUCTO, LEA CUIDADOSAMENTE EL MANUAL DE INSTRUCCIONES.",
    "FOTOSENSITIVE EPILEPSIE\nWENN SIE EINE VORGESCHICHTE MIT EPILEPSIE ODER KRAMPFANFÄLLEN HABEN, KONSULTIEREN SIE VOR DER VERWENDUNG EINEN ARZT. BESTIMMTE MUSTER KÖNNEN ANFÄLLE AUSLÖSEN, AUCH OHNE FRÜHERE VORGESCHICHTE. LESEN SIE VOR DER VERWENDUNG DIE BEDIENUNGSANLEITUNG SORGFÄLTIG DURCH.",
    "EPILESSIA FOTOSENSIBILE\nSE SI SOFFRE DI CRISI EPILETTICHE O DI DISTURBI ASSOCIATI, CONSULTARE UN MEDICO PRIMA DELL'USO. ALCUNI EFFETTI POSSONO CAUSARE CRISI EPILETTICHE ANCHE IN ASSENZA DI EPISODI PREGRESSI. PRIMA DI UTILIZZARE IL PRODOTTO, LEGGERE ATTENTAMENTE IL MANUALE DI ISTRUZIONI.",
    "FOTOSENSITIEVE EPILEPSIE\nALS U EEN GESCHIEDENIS HEEFT VAN EPILEPSIE OF AANVALLEN, RAADPLEEG DAN EEN ARTS VOORDAT U HET PRODUCT GEBRUIKT. BEPAALDE PATRONEN KUNNEN AANVALLEN VEROORZAKEN ZONDER EERDERE VOORGESCHIEDENIS. LEES VOORDAT U DIT PRODUCT GEBRUIKT ZORGVULDIG DE HANDLEIDING.",
    "EPILEPSIA FOTOSSENSÍVEL\nSE VOCÊ TEM HISTÓRICO DE EPILEPSIA OU CONVULSÕES, CONSULTE UM MÉDICO ANTES DE USAR. CERTOS PADRÕES PODEM DESENCADEAR CONVULSÕES SEM HISTÓRICO PRÉVIO. ANTES DE USAR ESTE PRODUTO, LEIA ATENTAMENTE O MANUAL DE INSTRUÇÕES.",
    "ПРЕДУПРЕЖДЕНИЕ ОБ ЭПИЛЕПСИИ\nЕСЛИ У ВАС КОГДА-ЛИБО БЫЛИ ЭПИЛЕПТИЧЕСКИЕ ПРИСТУПЫ, ПЕРЕД ИГРОЙ ПРОКОНСУЛЬТИРУЙТЕСЬ\nС ВРАЧОМ. МИГАЮЩЕЕ ИЗОБРАЖЕНИЕ МОЖЕТ ВЫЗВАТЬ ПРИСТУП, ДАЖЕ ЕСЛИ РАНЕЕ НЕ БЫЛО\nСИМПТОМОВ ЭПИЛЕПСИИ. ПЕРЕД ИСПОЛЬЗОВАНИЕМ УСТРОЙСТВА ВНИМАТЕЛЬНО ПРОЧИТАЙТЕ\nРУКОВОДСТВО ПОЛЬЗОВАТЕЛЯ."
];

const TXT_WAIT =
[
    "Please wait...",
    "Veuillez patienter...",
    "Por favor espere...",
    "Bitte warten...",
    "Attendere prego...",
    "Even geduld...",
    "Aguarde...",
    "Подождите..."
];

const TXT_YES =
[
    "Yes",
    "Oui",
    "Sí",
    "Ja",
    "Sì",
    "Ja",
    "Sim",
    "Да"
];

const TXT_NO =
[
    "No",
    "Non",
    "No",
    "Nein",
    "No",
    "Nee",
    "Não",
    "Нет"
];

const TXT_ENABLED =
[
    "Enabled",
    "Activé",
    "Habilitado",
    "Aktiviert",
    "Abilitato",
    "Ingeschakeld",
    "Ativado",
    "Включено"
]

const TXT_DISABLED =
[
    "Disabled",
    "Désactivé",
    "Deshabilitado",
    "Deaktiviert",
    "Disabilitato",
    "Uitgeschakeld",
    "Desativado",
    "Отключено"
]

const TXT_INFO =
[
    "Information",
    "Information",
    "Información",
    "Information",
    "Informazioni",
    "Informatie",
    "Informação",
    "Информация"
];

const TXT_DELETE =
[
    "Delete",
    "Supprimer",
    "Eliminar",
    "Löschen",
    "Elimina",
    "Verwijderen",
    "Eliminar",
    "Удалить"
];

const MSG_SUBMENU_EMPTY =
[
    "There are no elements.",
    "Il n'y a pas d'éléments.",
    "No hay elementos.",
    "Es gibt keine Elemente.",
    "Non ci sono elementi.",
    "Er zijn geen elementen.",
    "Não há elementos.",
    "Элементы отсутствуют."
];

const TXT_MESSAGE_BACK =
[
    "Back",
    "Retour",
    "Volver",
    "Zurück",
    "Indietro",
    "Terug",
    "Voltar",
    "Назад"
];

const TXT_MESSAGE_ENTER =
[
    "Accept",
    "Valider",
    "Aceptar",
    "Akzeptieren",
    "Accetta",
    "Accepteren",
    "Aceitar",
    "Принять"
];

const TXT_VMODE_SEC =
[
    "seconds",
    "seconds",
    "segundos",
    "sekunden",
    "secondi",
    "seconds",
    "seconds",
    "секунд"
];

const TXT_VMODE_REMTIME =
[
    "Remaining time",
    "Temps restant",
    "Tiempo restante",
    "Verbleibende Zeit",
    "Tempo rimanente",
    "Resterende tijd",
    "Tempo restante",
    "Оставшееся время"
];

const TXT_VMODE_MSG =
[
    "Can you read this screen?\nSelect [Yes] if you can.\nIf you do not press any buttons, the system will automatically go back to the previous setting.\n \n \n \n \n",
    "Pouvez-vous lire cet écran ?\nSélectionnez [Oui] si vous pouvez.\nSi vous n'appuyez sur aucun bouton, le système reviendra automatiquement au réglage précédent.\n \n \n \n \n",
    "¿Puede leer esta pantalla?\nSelecciona [Si] si la respuesta es afirmativa.\nSi no pulsa ningun botón, el sistema regresará a la configuracion anterior automaticamente.\n \n \n \n \n",
    "Kannst Du das hier lesen?\nWähle [Ja], wenn dem so ist.\nWenn du keine Tasten drückst, wechselt das System automatisch zur vorherigen Einstellung.\n \n \n \n \n",
    "Questo testo è visibile?\nSeleziona [Si] per mantenere l'impostazione altrimenti il sistema tornerà automaticamente all'impostazione precedente.\n \n \n \n \n",
    "Kun je dit scherm lezen?\nSelecteer [Ja] als je dat kunt.\nAls je geen knoppen indrukt, gaat het systeem automatisch terug naar de vorige instelling.\n \n \n \n \n",
    "Você consegue ler esta tela?\nSelecione [Sim] se puder.\nSe você não pressionar nenhum botão, o sistema voltará automaticamente à configuração anterior.\n \n \n \n \n",
    "Можете ли вы прочитать текст на этом экране?\nЕсли можете, выберите [Да].\nЕсли вы не нажмете никаких кнопок, система автоматически вернётся к предыдущим настройкам.\n \n \n \n \n"
];

const TXT_TITLE =
[
    "Title",
    "Titre",
    "Titulo",
    "Titel",
    "Titoli",
    "Titel",
    "Titulo",
    "Название"
];

const TXT_TITLES =
[
    "Titles",
    "Titres",
    "Títulos",
    "Titel",
    "Titoli",
    "Titels",
    "Títulos",
    "Названия"
];

const TXT_OPTION =
[
    "Options",
    "Options",
    "Opciones",
    "Options",
    "Opzioni",
    "Options",
    "Options",
    "Настройки"
];

const TXT_ENTER_NEW_PASS =
[
    "Enter your new password",
    "Enter your new password",
    "Ingrese su nueva contraseña",
    "Enter your new password",
    "Enter your new password",
    "Enter your new password",
    "Enter your new password",
    "Введите новый пароль"
];

const TXT_ENTER_CUR_PASS =
[
    "Enter your four-digir password",
    "Enter your four-digir password",
    "Ingrese su contraseña de cuatro digitos",
    "Enter your four-digir password",
    "Enter your four-digir password",
    "Enter your four-digir password",
    "Enter your four-digir password",
    "Введите свой четырёхзначный пароль"
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
    "Главная директория"
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
    "USB носитель"
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
    "Внутренний жесткий диск"
];

const TXT_DEVICE = 	// Item 3 Name
[
    "Device",
    "Device",
    "Dispositivo",
    "Device",
    "Device",
    "Device",
    "Device",
    "Устройство"
];

//////////////////////////////////////////////////////////////////////////
///*				   	   		PARAMETERS							  *///
//////////////////////////////////////////////////////////////////////////

// Index for Left-to-right scrolling text
let scrollIndex = 0;

// Default Text Color
const textColor = { r:255, g:255, b:255, a:128 };

// glowText object for selected text glowing animation.
const glowText = { Dir: 1, Value: 1, Min: 0, Max: 64, };

//////////////////////////////////////////////////////////////////////////
///*				   	   		   FONT								  *///
//////////////////////////////////////////////////////////////////////////

// Init Font System

let font_m = false;
let font_s = false;
let font_ss = false;

function LoadFONT()
{
    let font_path = `./THM/Original/text/font.ttf`; // Default Font
    if ((os.readdir(`${DATA.THEME_PATH}`)[0].includes("text")) && (os.readdir(`${DATA.THEME_PATH}text/`)[0].includes("font.ttf")))
    {
        font_path = `${DATA.THEME_PATH}text/font.ttf`
    }

    font_m = new Font(font_path);
    font_s = new Font(font_path);
    font_ss = new Font(font_path);
    font_m.scale = 0.65f;
    font_s.scale = 0.5f;
    font_ss.scale = 0.44f;
}

//////////////////////////////////////////////////////////////////////////
///*				   	   	   TEXT RENDERER						  *///
//////////////////////////////////////////////////////////////////////////

// Main Text Render object that will handle all text rendering on screen.

const TextRender = {
    currentFont: null,
    x: 0,
    y: 0,
    basex: 0,
    basey: 0,
    maxWidth: 512,
    screenWidth: 640,
    screenHeight: 448,
    textColor: Color.new(255, 255, 255, 128),

    // SetFont method to set the current font
    SetFont: function(font) {
        this.currentFont = font;
    },

    // SetPosition method to set the position for text rendering
    SetPosition: function(x, y) {
        this.x = x;
        this.y = y;
        this.basex = x;
        this.basey = y;
    },

    // SetTextColor method to set the color for the main text line
    SetTextColor: function(r, g, b, a) {
        if (a < 0) { a = 0; }
        if (a > 128) { a = 128; }
        this.textColor = Color.new(r, g, b, a);
    },

    // Function to get screen width and height from Screen.getMode()
    SetScreenDimensions: function() {
        const canvas = Screen.getMode();  // Assuming it returns an object with width and height properties
        this.screenWidth = 640;
        this.screenHeight = canvas.height;
    },

    // Function to process the input text into lines based on pixel width
    ProcessText: function(text) {
        let lines = typeof text === 'string' ? text.split('\n') : text;
        let finalLines = [];

        lines.forEach((line) => {
          let splitLines = this.WrapTextByPixelWidth(line);
          finalLines.push(...splitLines);
        });

        return finalLines;
    },

    // Wrap text based on pixel width (line wrapping)
    WrapTextByPixelWidth: function(line) {
        let words = line.split(' ');
        let lines = [];
        let currentLine = '';

        words.forEach((word) => {
            let testLine = currentLine ? currentLine + ' ' + word : word;
            let textWidth = this.currentFont.getTextSize(testLine).width;

            if (textWidth > this.maxWidth)
            {
                lines.push(currentLine);
                currentLine = word;
            }
            else
            {
                currentLine = testLine;
            }
        });

        if (currentLine.length > 0)
        {
            lines.push(currentLine);
        }

        return lines;
    },

    // Calculate alignment position for text
    CalculateAlignedPosition: function(lines, alignment) {

        if (alignment === "LEFT") { return; }

        let totalTextWidth = 0;
        let totalTextHeight = 0;
        let longestLine = "";
        let lineSize = this.currentFont.scale * 32

        lines.forEach((line) =>
        {
            if (line.length > longestLine.length) { longestLine = line; }
            totalTextHeight += lineSize;
        });

        totalTextWidth = this.currentFont.getTextSize(longestLine).width;

        if (alignment === "CENTER") {
          this.x = ((this.screenWidth - totalTextWidth) / 2) + this.basex;
        } else if (alignment === "RIGHT") {
          this.x = (this.screenWidth - totalTextWidth) + this.basex;
        }

        if (alignment === "CENTER") { this.y = ((this.screenHeight - totalTextHeight) / 2) + this.basey; }
    },

    // Print method to render text, with shadow and alignment
    Print: function(lines, alignment = "LEFT", outline = true)
    {
        // If only one line, make an array of one item.

        if (typeof lines === 'string') { lines = [lines]; }

        this.CalculateAlignedPosition(lines, alignment);

        const opacity = Color.getA(this.textColor);
        const shadowOpacity = Math.max(0, opacity - 32);

        lines.forEach((line, index) =>
        {
            const lineY = this.y + index * (this.currentFont.scale * 32);

            if ((outline) && (shadowOpacity > 0))
            {
                this.currentFont.color = Color.new(0, 0, 0, shadowOpacity);
                this.currentFont.print(this.x + 1, lineY + 1, line);
            }

            this.currentFont.color = this.textColor;
            this.currentFont.print(this.x, lineY, line);
        });
    }
};

// Set Text Renderer Initial Parameters
TextRender.SetScreenDimensions();

/*	Info:

    Main Function to render Text on Screen with several options.
        txt: 	String to render on screen.
        clr: 	Text Color.
        pos: 	Object with properties x and y to set the Text Position on screen.
        align: 	Text Alignment. Default is LEFT, but can be set to "CENTER" or "RIGHT".
        font: 	Text Font to use, default is "small".
        glow: 	Boolean to indicate if text should glow or not.
*/

function TxtPrint(txt, clr, pos, align = "LEFT", font = font_s, glow = false)
{
    if ((txt != "") && (clr.a > 0))
    {
        TextRender.SetFont(font);
        TextRender.SetTextColor(clr.r, clr.g, clr.b, clr.a);
        TextRender.SetPosition(pos.x, pos.y);
        TextRender.Print(txt, align);

        if (glow)
        {
            if (glowText.Value == glowText.Max) { glowText.Dir = -1; }
            if (glowText.Value == glowText.Min) { glowText.Dir = 1; }
            glowText.Value = glowText.Value + glowText.Dir;
            TextRender.SetTextColor(clr.r, clr.g, clr.b, glowText.Value * 2);
            TextRender.SetPosition(pos.x + 1, pos.y);
            TextRender.Print(txt, align, false);
        }
    }
}

// Pre-Process Epilepsy Warning Text for fast rendering on screen
let BOOT_WARNING_TEXT = false;

// Function exclusively made to render the Boot Warning Text at Boot.
function DisplayBootWarningText(alpha)
{
    if (BOOT_WARNING_TEXT === false)
    {
        TextRender.SetFont(font_s);
        BOOT_WARNING_TEXT = TextRender.ProcessText(BOOT_WARNING_ARRAY[DATA.LANGUAGE]);
    }

    TxtPrint(BOOT_WARNING_TEXT, { r: 255, g: 255, b: 255, a: alpha }, { x: 10 + (DATA.WIDESCREEN * 32), y: -20 }, "CENTER");
}

// Function exclusively made to render the Debug Info at the bottom of the screen.
function PrintDebugInfo()
{
    let mem = System.getMemoryStats();
    TxtPrint(`${Screen.getFPS(360)}  FPS - RAM USAGE: ${Math.floor(mem.used / 1024)}KB / ${Math.floor(DATA.EE_INFO.RAMSize / 1024)}KB`, textColor, { x:20 + (DATA.WIDESCREEN * 32), y: DATA.CANVAS.height - 40 }, "LEFT", font_ss);
}

console.log("INIT: TEXT INIT COMPLETE");
