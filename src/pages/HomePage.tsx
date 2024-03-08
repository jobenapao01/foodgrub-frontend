import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Deliver food right at your door.
        </h1>
        <span className="text-xl text-muted-foreground">
          One click delivery
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <img src={landingImage} alt="Website Landing" />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter text-orange-500">
            Order even faster
          </span>
          <span className="text-muted-foreground">
            Download the FoodGrub App for faster order and delivery.
          </span>
          <img src={appDownloadImage} alt="GooglePlay" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
