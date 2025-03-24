import { useEffect, useState } from "react";
import axios from "axios";
import KakaoMap from "./components/KakaoMap";
import List from "./components/List";
import { Button } from "antd";

const MainPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("진행전시");
  
  useEffect(() => {
    // console.log("API_BASE_URL 확인:", import.meta.env.VITE_API_BASE_URL);
    axios.get("/api/exhibition") // 백엔드에서 전시 데이터 가져오기
      .then((response) => {
        // console.log("데이터 확인: ", response.data);
        setExhibitions(response.data);
      })
      .catch(error => console.error("데이터 가져오기 실패:", error));
  }, []);
  
  // 지도 보기 버튼 클릭 시 위치 정보 업데이트 
  const handleShowMap = (x) =>{
    console.log('선택한 기관:', x);
    setSelectedExhibition({
      name: x.name,
      lat: parseFloat(x.latitude),
      lng: parseFloat(x.longitude),
    });
  };

  // 장르 필터링
  const filterExhibitions = (genre) => {
    setSelectedGenre(genre);
  };

  // 필터링된 전시 목록
  const filteredExhibitions = exhibitions.filter((exhibition) => {
    if (selectedGenre === "진행전시") {
      return ["전시", "현재전시"].includes(exhibition.genre);
    }
    return exhibition.genre === selectedGenre;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>전시 목록</h2>

      {/* 네비게이션 필터 버튼 */}
      <div style={{ marginBottom: "20px" }}>
        {["진행전시", "예정전시", "과거전시"].map((genre) => (
          <Button
            key={genre}
            type={selectedGenre === genre ? "primary" : "default"}
            onClick={() => filterExhibitions(genre)}
            style={{ marginRight: "10px" }}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* 전시 목록 리스트 */}
      <List exhibitions={filteredExhibitions} onShowMap={handleShowMap} />

      {/* 지도 표시 */}
      {selectedExhibition && (
        <div style={{ marginTop: "30px", height: "550px" }}>
          <h3>{selectedExhibition.name} 위치</h3>
          <KakaoMap
            lat={selectedExhibition.lat}
            lng={selectedExhibition.lng}
            name={selectedExhibition.name}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;