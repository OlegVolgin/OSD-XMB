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