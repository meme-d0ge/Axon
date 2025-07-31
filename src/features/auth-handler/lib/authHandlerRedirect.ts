import punycode from "punycode";
import {type useRouter} from "@tanstack/react-router";

export const authHandlerRedirect = (
    urlRedirect: string,
    loginFormValue: {
        parseUrl: URL | null;
        inputValue: string;
    },
    router: ReturnType<typeof useRouter>
) => {
    const encodeValue = punycode.toUnicode(encodeURIComponent(loginFormValue.inputValue))

    if (loginFormValue.parseUrl?.protocol === 'http:') {
        router.history.replace(
            `${urlRedirect}/${encodeValue}?protocol=http`,
            {
                replace: true,
                updatedAt: false,
            },
        );
    } else if (loginFormValue.parseUrl?.protocol === 'https:') {
        router.history.replace(
            `${urlRedirect}/${encodeValue}`,
            {
                replace: true,
                updatedAt: false,
            },
        );
    } else {
        router.history.replace(`${urlRedirect}${encodeValue ? `/${encodeValue}` : ''}`, {
            replace: true,
            updatedAt: false,
        });
    }
}