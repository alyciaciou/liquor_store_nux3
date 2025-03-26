import { defineNuxtPlugin } from "#app";
import { defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

export default defineNuxtPlugin(() => {
    Object.entries(AllRules).forEach(([ruleName, ruleFn]) => {
        if (typeof ruleFn === "function") {
            defineRule(ruleName, ruleFn);
        }
    });

    configure({
        generateMessage: localize({ zh_TW: zhTW }),
        validateOnInput: true,
    });
    setLocale("zh_TW");
});
