import { Card, Row, Col, Button } from "antd";
import "../css/List.css";

const List = ({ exhibitions, onShowMap }) => {
  return (
    <Row gutter={[16, 16]}>
      {exhibitions.map((exhibition) => (
        <Col xs={24} sm={12} md={8} lg={6} key={exhibition.id}>
          <Card className="card-img"
            cover={
              <div className="card-cover">
                <img alt={exhibition.title} src={exhibition.image_url} />
              </div>
            }
          >
            <div className="title">{exhibition.title}</div>
            <div className="dscrip">
                <p className="institution-name">기관: {exhibition.institution.name}</p>
                <p className="institution-period">기간: {exhibition.period}</p>
                <p className="institution-contact">문의: {exhibition.institution.contact_point || exhibition.institution.url.match(/^https?:\/\/[^\/]+/)[0]} </p>
            </div>
            
            <Button type="link" onClick={() => {
              console.log('기관 정보:', exhibition.institution);
              onShowMap(exhibition.institution)
            }}>위치</Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default List;
