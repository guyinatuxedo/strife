"use strict";

/*************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT License.
*************************************************/
// .load jsprovider.dll
// .scriptload C:\Users\guyinatuxedo\Documents\windbg\strife.js
// dx Debugger.State.Scripts.strife.Contents.strife()
// vmbusvdev!VMBusUserModeTransportImpl::TryRead

function strife(name)
{

	var ctl = host.namespace.Debugger.Utility.Control;
	var returnAddress;
	var currentInstruction;

	var output = "";
	
	var i;
	var tabs = 0;

	while (tabs >= 0) {


		currentInstruction = ctl.ExecuteCommand("u rip")[1];

		if (currentInstruction.includes("call")) {
			output += "\t".repeat(tabs) + "call: " + currentInstruction + "\n";
			host.diagnostics.debugLog("\t".repeat(tabs), "call: ", currentInstruction, "\n");
			tabs++;
			ctl.ExecuteCommand("t");
		}

		else if (currentInstruction.includes("ret")) {
			ctl.ExecuteCommand("t");
			tabs--;
		}

		ctl.ExecuteCommand("pct");
	}

	host.diagnostics.debugLog("\n\nfinal\n\n");
	host.diagnostics.debugLog(output);
}
