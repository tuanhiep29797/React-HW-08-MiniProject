import { HomeTwoTone, ProductOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setUser] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    setUser(products.find((u) => String(u.id) === id));
  }, [id]);

  if (!product) return <h1>Product not Found</h1>;

    const items = [
    {
      title: (
        <Link to="/dashboard">
          <HomeTwoTone />
        </Link>
      ),
    },
    {
      title: (
        <Link to="/products">
          <ProductOutlined /> Products
        </Link>
      ),
    },
    {
      title: (
      <Link to={`/products/${product.id}`} >
        {product.title}
      </Link>
      ),
    },
  ];

  return (
    <div className="container detail">
      <Divider orientation="center" style={{ fontSize: 50, margin: 20 }}>
        Product Detail
      </Divider>
      <Breadcrumb style={{ margin: 12, marginRight: "auto" }} items={items} />
      <Row gutter={24}>
        <Col span={10}>
          <div>
            <Image width={300} src={product.image} />
          </div>
        </Col>
        <Col span={10}>
          <div>
            <h1>{product.title}</h1>
            <h4>
              <b>{product.category.toUpperCase()}</b>
            </h4>
            <h2>Price: ${product.price}</h2>
            <p>{product.description}</p>
            <Button variant="solid" color="cyan" style={{width: "100%", padding: 20, fontSize: 25}}>Buy Now</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
