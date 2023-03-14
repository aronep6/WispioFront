import { Outlet } from "react-router-dom";
import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Editor",
    usePadding: false,
};

const Editor = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col h-full">
            <Outlet />
        </div>
    </PageWrapper>;
};

export default Editor;