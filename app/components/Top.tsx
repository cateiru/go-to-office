import { Footer } from "./Footer";
import { ButtonPage } from "./ButtonPage";
import { HistoryPage } from "./HistoryPage";
import { SetupModal } from "./SetupModal";
import { ToolBar } from "./TooBar";

export const Top = () => {
  return (
    <>
      <ButtonPage />
      <HistoryPage />
      <ToolBar />
      <Footer />
      <SetupModal />
    </>
  );
};
