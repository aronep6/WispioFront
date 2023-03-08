import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Dashboard",
};

const Dashboard = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            This is the dashboard page content area (not the sidebar)
        </div>
    </PageWrapper>;
}

export default Dashboard;