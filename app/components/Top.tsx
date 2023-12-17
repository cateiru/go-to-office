import { Footer } from "./Footer";
import { ButtonPage } from "./ButtonPage";
import { HistoryPage } from "./HistoryPage";
import { SetupModal } from "./SetupModal";

export const Top = () => {
  return (
    <>
      <ButtonPage />
      <HistoryPage />
      <Footer />
      <SetupModal />
    </>
  );
};
