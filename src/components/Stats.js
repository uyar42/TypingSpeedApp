import React from "react";
import { useState, useEffect } from "react";
import { timeSelector } from "../redux/wordSlice";
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Stats({ countKeyDown }) {
  const times = useSelector(timeSelector);
  const score = useSelector((state) => state.words.score);
  console.log(score.true, "ture");
  console.log(score.false, "false");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const accurancyRate = (score.true / (score.true + score.false)) * 100;

  useEffect(() => {
    if (times === 0) {
      handleOpen();
    }
  }, [times]);

  return (
    <div className="absolute left-2/4">
      {" "}
      <InfoOutlinedIcon
        fontSize="large"
        className="hover:cursor-pointer static"
        onClick={handleOpen}
      >
        ?
      </InfoOutlinedIcon>
      {times === 0 && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              className="text-center"
            >
              Sonuç
            </Typography>
            <div className="text-xl m-3 ">
              {" "}
              {"> Tuş Vuruşu :"}{" "}
              <span className="text-blue-500">{countKeyDown}</span>
            </div>
            <hr></hr>
            <div className="text-xl m-3">
              {"> Doğru Kelime : "}
              <span className="text-green-400">{score.true}</span>
            </div>
            <hr></hr>
            <div className="text-xl m-3">
              {" "}
              {" > Yanlış Kelime :"}{" "}
              <span className="text-red-400">{score.false}</span>
            </div>
            <hr></hr>
            <div className="text-xl m-3">
              {"   > Doğruluk : "}
              <span className="text-purple-600">{accurancyRate}</span>
            </div>
            <hr></hr>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Stats;
