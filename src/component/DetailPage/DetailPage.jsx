import { useLoaderData, useNavigate, useParams } from "react-router";
import classes from "./DetailPage.module.css";
import { useEffect } from "react";
import { format2 } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice, detailSlice } from "../Layout/Layout";

function DetailPage() {
  const params = useParams();
  const data = useLoaderData();
  const product = data.find((e) => e._id.$oid == params.productId);
  const dispatch = useDispatch();
  const showImg = useSelector((state) => state.detail.showImg);
  const amount = useSelector((state) => state.detail.amount);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(detailSlice.actions.setShowImg(product.img1));
    dispatch(detailSlice.actions.setAmount(1));
  }, [params]);

  const relatedProducts = data.filter(
    (e) => e.category == product.category && e._id.$oid !== product._id.$oid
  );

  return (
    <div>
      <div className={classes.detailPage}>
        <div className={classes.imgDetail}>
          <ul>
            <li>
              <img
                onClick={() =>
                  dispatch(detailSlice.actions.setShowImg(product.img1))
                }
                src={product.img1}
                alt=""
              />
            </li>
            <li>
              <img
                onClick={() =>
                  dispatch(detailSlice.actions.setShowImg(product.img2))
                }
                src={product.img2}
                alt=""
              />
            </li>
            <li>
              <img
                onClick={() =>
                  dispatch(detailSlice.actions.setShowImg(product.img3))
                }
                src={product.img3}
                alt=""
              />
            </li>
            <li>
              <img
                onClick={() =>
                  dispatch(detailSlice.actions.setShowImg(product.img4))
                }
                src={product.img4}
                alt=""
              />
            </li>
          </ul>
          <img src={showImg} alt="" />
        </div>
        <div className={classes.info}>
          <h1>{product.name}</h1>
          <span>{format2(product.price)} VND</span>
          <p>{product.short_desc.slice(0, 600)}</p>
          <h4>
            CATEGORY: <span>{product.category}</span>
          </h4>
          <div className={classes.quantity}>
            <div>
              <span>QUANTITY </span>
              <div>
                <button
                  onClick={() =>
                    dispatch(
                      detailSlice.actions.setAmount(
                        amount == 1 ? 1 : amount - 1
                      )
                    )
                  }
                >
                  ◀
                </button>
                <button style={{ cursor: "initial" }} disabled>
                  {amount}
                </button>
                <button
                  onClick={() =>
                    dispatch(detailSlice.actions.setAmount(amount + 1))
                  }
                >
                  ▶
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(cartSlice.actions.addCart({ ...product, amount }))
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <button disabled>DESCRIPTION</button>
        <h3>PRODUCT DESCRIPTION</h3>
        <ul>
          {product.long_desc.split(/\r?\n/g).map((e, i) => (
            <li key={i}>
              <span>{e}</span>
            </li>
          ))}
        </ul>
        <h3>RELATED PRODUCTS</h3>
        <ul className={classes.relatedUl}>
          {relatedProducts.map((e) => (
            <li
              onClick={() => navigate(`/detail/${e._id.$oid}`)}
              key={e._id.$oid}
            >
              <img src={e.img1} alt="" />
              <p>{e.name}</p>
              <span>{format2(e.price)} VND</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
