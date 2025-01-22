//////////////////////////////////////////////////////////////////////////
///*				   		INTERFACE HANDLERS						  *///
/// 				   		  										   ///
///		  Here are the main loop handlers for the different states	   ///
///							of the interface.						   ///
/// 				   		  										   ///
//////////////////////////////////////////////////////////////////////////

/* 
	This is the main loop function that will 
	draw everything on screen 
*/

function dashboard()
{
	switch(DATA.DASH_STATE)
	{
		case "IDLE":
			
			if (DATA.DASH_PADMODE != 1) { SetDashPadEvents(1); }
			DrawSelectedItem();
			DrawUnselectedItems();
			DrawSelectedCat();
			DrawUnselectedCats();
			DrawOptionBox();
		
			if (DATA.PRNTSUCC)
			{
				DATA.PRNTSUCC = false;
				DATA.DASH_MOVE_FRAME = 0;
				SelectItem();
			}
			break;
		case "MOVE_BACK": 
			DrawMovingCats(1);
			DrawMovingOptsLR(1);
			DASH_UPDATE_FRAME("IDLE");
			break;
		case "MOVE_FORWARD": 
			DrawMovingCats(-1);
			DrawMovingOptsLR(-1);
			DASH_UPDATE_FRAME("IDLE");
			break;
		case "MOVE_DOWN": 
			DrawMovingOptsUD(-1)
			DrawSelectedCat();
			DrawUnselectedCats();
			DASH_UPDATE_FRAME("IDLE");
			break;
		case "MOVE_UP": 
			DrawMovingOptsUD(1)
			DrawSelectedCat();
			DrawUnselectedCats();
			DASH_UPDATE_FRAME("IDLE");
			break;
		case "FADE_OUT":
			if (DATA.DASH_CURSUB > -1)
			{
				DrawSubMenuContentFade(2);
			}
			else
			{
				DrawInterfaceFade(DATA.DASH_MOVE_FRAME, -1);
			}
			
			DASH_UPDATE_FRAME("NULL"); 
			
			if (DATA.DASH_MOVE_FRAME == 20) 
			{	
				DATA.EXIT_STATE = 0;
				DATA.CURRENT_STATE = 8;
				DATA.FADE_FRAME = 0;
			}
			
			break;
		case "FADE_IN":
			let NEXT_STATE_IN = "IDLE";
			if (DATA.DASH_CURSUB > -1)
			{
				NEXT_STATE_IN = (DATA.DASH_CURSUB > 0) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE";
				DrawSubMenuContentFade(1);
			}
			else
			{
				DrawInterfaceFade(DATA.DASH_MOVE_FRAME);
			}
			
			DASH_UPDATE_FRAME(NEXT_STATE_IN); 
			break;
		case "IDLE_MESSAGE_FADE_IN":
			if (DATA.DASH_PADMODE != 0) { SetDashPadEvents(0); }
			let NEXT_IDLE_MESSAGE_STATE = "IDLE_MESSAGE";
			if (DATA.DASH_CURSUB > -1)
			{
				NEXT_IDLE_MESSAGE_STATE = "SUBMENU_MESSAGE_IDLE";
				DrawSubMenuContent(false, !DATA.MESSAGE_INFO.BG);
				DrawSubMenuOptions(false, !DATA.MESSAGE_INFO.BG);
			}
			else if (!DATA.MESSAGE_INFO.BG)
			{
				DrawInterfaceFade(DATA.DASH_MOVE_FRAME, -1);
			}
			else
			{
				DrawSelectedItem();
				DrawUnselectedItems();
				DrawSelectedCat();
				DrawUnselectedCats();
			}
			
			DASH_UPDATE_FRAME(NEXT_IDLE_MESSAGE_STATE); 
			break;
		case "IDLE_MESSAGE":
			if (DATA.MESSAGE_INFO.BG)
			{
				DrawSelectedItem();
				DrawUnselectedItems();
				DrawSelectedCat();
				DrawUnselectedCats();
			}
			
			if (DATA.DASH_PADMODE != 4) { SetDashPadEvents(4); }
			if (DATA.OVSTATE != "MESSAGE_IDLE") { DATA.OVSTATE = "MESSAGE_IDLE"; }
			break;
		case "IDLE_MESSAGE_FADE_OUT":
			if (DATA.DASH_PADMODE != 0) { SetDashPadEvents(0); }
			let NEXT_IDLE_MESSAGE_STATE_OUT = "IDLE";
			
			if (DATA.DASH_CURSUB > -1)
			{
				NEXT_IDLE_MESSAGE_STATE = "SUBMENU_IDLE";
				DrawSubMenuContent(!DATA.MESSAGE_INFO.BG, false);
				DrawSubMenuOptions(!DATA.MESSAGE_INFO.BG, false);
			}
			else if (!DATA.MESSAGE_INFO.BG)
			{
				DrawInterfaceFade(DATA.DASH_MOVE_FRAME, 1);
			}
			else
			{
				DrawSelectedItem();
				DrawUnselectedItems();
				DrawSelectedCat();
				DrawUnselectedCats();
			}
			
			DASH_UPDATE_FRAME(NEXT_IDLE_MESSAGE_STATE_OUT);
			break;
		case "MENU_CONTEXT_IN":
			DrawContextMenuAnimation(1);
			DASH_UPDATE_FRAME("MENU_CONTEXT");
			break;
		case "MENU_CONTEXT":
			if (DATA.DASH_PADMODE != 3) { SetDashPadEvents(3); }
			DrawSelectedItem(DATA.DASH_CURCAT, DATA.DASH_CUROPT, 20, -10, -10, 0, -105, 20, 0, -105);
			DrawUnselectedItemsInsideSub(0, 0, -8, 8, -60, -128);
			DrawSelectedCat(DATA.DASH_CURCAT, 0, 0, 0, 0, -128);
			DrawUnselectedCats(-60, -8, 4);
			DrawContextMenu();
			DrawContextOptions();
			ExecutePreviewFunc();
			break;
		case "MENU_CONTEXT_OUT":
			DrawContextMenuAnimation(-1);
			DASH_UPDATE_FRAME("IDLE");
			if (DATA.DASH_MOVE_FRAME > 19) 
			{ 
				DATA.DASH_CURCTXLVL--;
				Timer.destroy(DATA.DASH_CTX_TIMER);
			};
			break;
		case "SUBMENU_IN":
			DrawInitialSubMenuFade(1);
			DASH_UPDATE_FRAME("SUBMENU_IDLE"); 
			break;
		case "SUBMENU_IDLE":
			if (DATA.DASH_PADMODE != 2) { SetDashPadEvents(2); }
			DrawSubMenuContent();
			DrawSubMenuOptions();
			DrawOptionBox();
		
			if (DATA.PRNTSUCC)
			{
				DATA.PRNTSUCC = false;
				DATA.DASH_MOVE_FRAME = 0;
				SelectItem();
			}
			break;
		case "SUBMENU_MOVE_UP":
			DrawSubMenuContent();
			DrawSubMenuMovingOptionsUD(1);
			let NEXT_STATE_UP = (DATA.DASH_CURSUB > 0) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE"; 
			DASH_UPDATE_FRAME(NEXT_STATE_UP); 
			break;
		case "SUBMENU_MOVE_DOWN":
			DrawSubMenuContent();
			DrawSubMenuMovingOptionsUD(-1);
			let NEXT_STATE_DOWN = (DATA.DASH_CURSUB > 0) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE"; 
			DASH_UPDATE_FRAME(NEXT_STATE_DOWN); 
			break;
		case "SUBMENU_OUT":
			DrawInitialSubMenuFade(-1);
			DASH_UPDATE_FRAME("IDLE"); 
			if (DATA.DASH_MOVE_FRAME > 19) 
			{ 
				DATA.DASH_PRVSUB--;
				DATA.DASH_CURSUB--;
			};
			break;
		case "NEW_SUBMENU_IN":
			DrawNewSubMenuFade(1);
			DASH_UPDATE_FRAME("NEW_SUBMENU_IDLE"); 
			break;
		case "NEW_SUBMENU_IDLE":
			if (DATA.DASH_PADMODE != 2) { SetDashPadEvents(2); }
			DrawSubMenuContent();
			DrawSubMenuOptions();
			break;
		case "NEW_SUBMENU_OUT":
			DrawNewSubMenuFade(-1);
			let NEXT_STATE_OUT = (DATA.DASH_CURSUB > 1) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE"; 
			DASH_UPDATE_FRAME(NEXT_STATE_OUT);
			if (DATA.DASH_MOVE_FRAME > 19) 
			{ 
				DATA.DASH_CURSUBOPT = DASH_SUB[DATA.DASH_PRVSUB].Selected; 
				DATA.DASH_PRVSUB--;
				DATA.DASH_CURSUB--;
			};
			break;
		case "SUBMENU_CONTEXT_IN":
			DrawContextSubMenuAnimation(1);
			DASH_UPDATE_FRAME("SUBMENU_CONTEXT");
			break;
		case "SUBMENU_CONTEXT":
			if (DATA.DASH_PADMODE != 3) { SetDashPadEvents(3); }
			DrawContextSubMenuContent();
			DrawContextMenu();
			DrawContextOptions();
			ExecutePreviewFunc();
			break;
		case "SUBMENU_CONTEXT_OUT":
			DrawContextSubMenuAnimation(-1);
			let NEXT_STATE_CONTEXT_OUT = (DATA.DASH_CURSUB > 1) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE"; 
			DASH_UPDATE_FRAME(NEXT_STATE_CONTEXT_OUT);
			if (DATA.DASH_MOVE_FRAME > 19) 
			{ 
				DATA.DASH_CURCTXLVL--;
				Timer.destroy(DATA.DASH_CTX_TIMER);
			};
			break;
		case "SUBMENU_CONTEXT_MESSAGE_FADE_OUT":
			if (DATA.DASH_PADMODE != 0) { SetDashPadEvents(0); }
			DrawContextSubMenuAnimation(-1, !DATA.MESSAGE_INFO.BG);
			DASH_UPDATE_FRAME("SUBMENU_MESSAGE_IDLE");
			break;
		case "SUBMENU_MESSAGE_IDLE":
			if (DATA.MESSAGE_INFO.BG)
			{
				DrawSubMenuContent();
				DrawSubMenuOptions();
			}
			
			if (DATA.DASH_PADMODE != 4) { SetDashPadEvents(4); }
			if (DATA.OVSTATE != "MESSAGE_IDLE") { DATA.OVSTATE = "MESSAGE_IDLE"; }
			break;
		case "SUBMENU_MESSAGE_FADE_IN":
			DrawSubMenuContent(!DATA.MESSAGE_INFO.BG);
			DrawSubMenuOptions(!DATA.MESSAGE_INFO.BG);
			if (DATA.DASH_PADMODE != 0) { SetDashPadEvents(0); }
			let NEXT_STATE_MESSAGE_IN = (DATA.DASH_CURSUB > 1) ? "NEW_SUBMENU_IDLE" : "SUBMENU_IDLE"; 
			DASH_UPDATE_FRAME(NEXT_STATE_MESSAGE_IN);
			break;
	}
}

/* 	
	This is the exit handler function which will 
	handle the exit events (launch an Elf or execute code) 
*/

function exit()
{
	switch (DATA.EXIT_STATE)
	{
		case 0:	// Validate if App or functions can be executed, if not, show error screen message
			if (DASH_SEL.Type == "CODE")
			{
				if (DASH_SEL.Value) 
				{
					DATA.EXIT_STATE = 1
					DATA.OVSTATE = "EXIT";
				}
				else
				{
					// PENDING SHOW ERROR MESSAGE
					console.log("exit: Option Function Code is NULL.");
					DATA.CURRENT_STATE = 1;
					DATA.OVSTATE = "IN";
					DATA.DASH_STATE = "FADE_IN";
				}
			}
			else if (DASH_SEL.Type == "ELF")
			{
				// Check if File Exists.
				const elfExists = std.exists(DASH_SEL.Value.Path);
				if (elfExists)
				{
					DATA.EXIT_STATE = 1
				}
				else
				{
					// PENDING SHOW ERROR MESSAGE
					console.log("exit: ELF File not found.");
					DATA.CURRENT_STATE = 1;
					DATA.OVSTATE = "IN";
					DATA.DASH_STATE = "FADE_IN";
				}
			}
			else
			{
				// PENDING SHOW ERROR MESSAGE
				console.log("exit: Unknown Object Type.");
				DATA.CURRENT_STATE = 1;
				DATA.OVSTATE = "IN";
				DATA.DASH_STATE = "FADE_IN";
			}
			break;
		case 1: // Screen Fade Out to Black
			if (DATA.FADE_FRAME > 41)
			{
				DATA.OVCOL = Color.new(0, 0, 0, (DATA.FADE_FRAME - 42) * 3);
				DATA.EXIT_STATE = (DATA.FADE_FRAME > 83) ? DATA.EXIT_STATE + 1 : DATA.EXIT_STATE;
			}
			break;
		case 2: // Set Next State to Custom Function or Launch Elf depending on Variable Set
			DATA.OVCOL = Color.new(0, 0, 0, 128);
			DATA.CONFIG.Process(); // Save Configuration Files
			DATA.CURRENT_STATE = (DASH_SEL.Type == "ELF") ? 9 : 99;
			break;
	}
	
	DATA.FADE_FRAME += 2;
}

/* 
	This will be executed after the exit function 
	has finished and launch an ELF file 
*/

function launch()
{
	if ("Code" in DASH_SEL.Value) { DASH_SEL.Value.Code(); }
	
	console.log(`Launching ELF: ${DASH_SEL.Value.Path}`);
	console.log(`   With Args: ${DASH_SEL.Value.Args}`);
	
	logl(`Launching ELF: ${DASH_SEL.Value.Path}`);
	logl(`    With Args: ${DASH_SEL.Value.Args}`);
		
	System.loadELF(DASH_SEL.Value.Path, DASH_SEL.Value.Args);
}

/* 
	You can reassign the function called here with 
	a plugin to execute custom code after exiting the app. 
*/

function custom() 
{ 
	DATA.CUSTOM_FUNCTION(); // Reassignable function
}
