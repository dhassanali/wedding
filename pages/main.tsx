import React from "react";
import { createRoot } from "react-dom/client";
import Invitation from "../app/invitation";
import { languageFromQuery, invitationMetadata } from "../lib/invitation-language";
import "../app/globals.css";
const language=languageFromQuery(new URLSearchParams(window.location.search).get("lang"));
document.title=invitationMetadata(language).title;
createRoot(document.getElementById("root")!).render(<Invitation initialLanguage={language}/>);
