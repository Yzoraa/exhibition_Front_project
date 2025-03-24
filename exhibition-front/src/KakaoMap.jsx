import { useLocation } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";

const MapPage = () => {
  const location = useLocation();
  const { name, lat, lng } = location.state || {};

  if (!name || lat === undefined || lng === undefined) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <h2>{name} 위치</h2>
      <KakaoMap lat={lat} lng={lng} name={name} />
    </div>
  );
};

export default MapPage;
