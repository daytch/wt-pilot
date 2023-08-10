import { useRef, useState, useEffect } from 'react';
import Xarrow from 'react-xarrows';
import { useSelector } from 'react-redux';

function FlowChart() {
  const [isLoading, setIsLoading] = useState(true);
  const dataFlow = useSelector((state) => state.Dashboard.dataFlow);
  useEffect(() => {
    setIsLoading(!isLoading);
  }, [dataFlow]);

  const getClass = (flag) => {
    switch (flag) {
      case '1':
        return ' flagGreen';
      case '2':
        return ' flagYellow';
      case '3':
        return ' flagBlue';
      case '4':
        return ' flagRed';
      case '5':
        return ' flagCyan';
      default:
        return ' ';
    }
  };

  const B1 = useRef(null);
  const B2 = useRef(null);
  const B3 = useRef(null);
  const B4 = useRef(null);
  const B5 = useRef(null);
  const B6 = useRef(null);
  const B7 = useRef(null);
  const B8 = useRef(null);
  const B9 = useRef(null);
  const B10 = useRef(null);
  const B11 = useRef(null);
  const B12 = useRef(null);
  const B13 = useRef(null);
  const B14 = useRef(null);
  const B15 = useRef(null);
  const B16 = useRef(null);

  return (
    <div className="block h-[75vh] w-[100%]">
      <div className="flex h-1/6 justify-evenly w-[100%]">
        <div className="block h-[50%] w-[10%] justify-center items-center" />
        <div
          ref={B2}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPPKBKedatangan
          )}`}
        >
          PPKB KEDATANGAN
        </div>
        <div
          ref={B4}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagRPKRO
          )}`}
        >
          RPKRO
        </div>
        <div
          ref={B7}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagSPKPandu
          )}`}
        >
          SPK PANDU
        </div>
        <div
          ref={B9}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPPKBPindah
          )}`}
        >
          PPKB PINDAH
        </div>
        <div
          ref={B12}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPPKBBerangkat
          )}`}
        >
          PPKB BERANGKAT
        </div>
        <div
          ref={B15}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagSPKPanduKeluar
          )}`}
        >
          SPK PANDU KELUAR
        </div>
      </div>
      <div className="flex lg:h-[12.5%] md:h-[5%] justify-evenly w-[100%]" />
      <div className="flex h-1/6 justify-evenly w-[100%]">
        <div
          ref={B1}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagKeagenan
          )}`}
        >
          KEAGENAN
        </div>
        <div
          ref={B3}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPKK
          )}`}
        >
          PKK
        </div>
        <div
          ref={B5}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagRKBM
          )}`}
        >
          RKBM
        </div>
        <div
          ref={B8}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPPK
          )}`}
        >
          PPK
        </div>
        <div
          ref={B10}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagPindah
          )}`}
        >
          PINDAH
        </div>
        <div
          ref={B13}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagLK3
          )}`}
        >
          LK3
        </div>
        <div className="flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center" />
      </div>
      <div className="flex lg:h-[12.5%] md:h-[5%] justify-evenly w-[100%]" />
      <div className="flex h-1/6 justify-evenly w-[100%]">
        <div className="flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center" />
        <div className="flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center" />
        <div
          ref={B6}
          className={`flex items-center justify-center h-[50%] w-[10%] text-xl text-center border border-black${getClass(
            dataFlow.FlagSPM
          )}`}
        >
          SPM
        </div>
        <div className="flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center" />
        <div
          ref={B11}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagSPOG
          )}`}
        >
          SPOG
        </div>
        <div
          ref={B14}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagKepelautan
          )}`}
        >
          KEPELAUTAN
        </div>
        <div
          ref={B16}
          className={`flex items-center justify-center h-[50%] w-[10%] lg:text-xl md:text-xs text-center border border-black${getClass(
            dataFlow.FlagSPB
          )}`}
        >
          SPB
        </div>
      </div>
      <Xarrow start={B1} end={B3} color="black" />
      <Xarrow
        start={B1}
        startAnchor="bottom"
        end={B6}
        color="black"
        path="grid"
      />
      <Xarrow start={B2} end={B4} color="black" />
      <Xarrow start={B3} end={B2} color="black" />
      <Xarrow start={B3} end={B5} color="black" />
      <Xarrow
        start={B4}
        startAnchor="right"
        endAnchor="left"
        end={B8}
        color="black"
        path="grid"
      />
      <Xarrow
        start={B5}
        startAnchor="top"
        end={B2}
        endAnchor="bottom"
        color="black"
        path="grid"
      />
      <Xarrow
        start={B6}
        startAnchor="right"
        endAnchor="left"
        end={B8}
        color="black"
        path="grid"
      />
      <Xarrow
        start={B7}
        startAnchor="right"
        end={B11}
        endAnchor="left"
        color="black"
        path="grid"
      />
      <Xarrow start={B8} end={B7} color="black" />
      <Xarrow start={B10} end={B9} color="black" dashness />
      <Xarrow start={B11} end={B10} color="black" dashness />
      <Xarrow start={B11} end={B14} color="black" />
      <Xarrow start={B12} end={B15} color="black" dashness />
      <Xarrow start={B13} end={B12} color="black" />
      <Xarrow start={B14} end={B13} color="black" />
      <Xarrow
        start={B13}
        end={B16}
        color="black"
        path="grid"
        startAnchor="right"
        endAnchor="left"
      />
      <Xarrow start={B15} end={B16} color="black" dashness />
    </div>
  );
}

export default FlowChart;
