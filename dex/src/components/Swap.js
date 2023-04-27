import React, {useState, useEffect}from 'react'
import { Input, Popover , Radio, Modal, message} from 'antd';
import {ArrowDownOutlined , DownOutlined, SettingOutlined } from "@ant-design/icons";
import tokenList  from "../tokenList.json"

function Swap() {
  const [slippage , setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false)
  const [changeToken, setChangeToken] = useState(1);



  const handleSlippageChange = (e) =>{
      setSlippage(e.target.value)
  }
  const onChangeToken  = (e) =>{
    setTokenOneAmount(e.target.value)

  }
  const onSwitchToken = ()=>{
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }
  const openModal = (assetNumber)=>{
    setChangeToken(assetNumber)
    setIsOpen(true)
  }
  const modifyToken = (token) =>{
    if(changeToken===1){
      setTokenOne(tokenList[token])
    }else{
      setTokenTwo(tokenList[token])
    }
    setIsOpen(false)

  }
  const fetchDexSwap = () =>{
    
  }
  const settings = (
    <>
    <div>Slipage Tolerance</div>
       <div>
            <Radio.Group value={slippage} onChange={handleSlippageChange}>
                <Radio.Button  value={0.5}>0.5%</Radio.Button>
                <Radio.Button value={2.5}>2.5%</Radio.Button>
                <Radio.Button value={3.5}>3.5%</Radio.Button>
            </Radio.Group>
    </div>
    </>

  );
  return (
    <>
    <Modal
       open={isOpen}
       footer={null}
       onCancel={()=>setIsOpen(false)}
       title="Select a token"
    
    >
      <div className="modaContent">
        {
          tokenList?.map((e,i)=>{
            return(
              <div 
              className="tokenChoice"
              key={i}
              onClick={()=>modifyToken(i)}              
              >
                <img src={e.img} alt={e.ticker} className='assetLogo'/>
                <div className="tokenChoiceName">
                  <div className='tokenName'>{e.name}</div>
                  <div className='tokenTicker' >{e.ticker} </div>
                </div>
              </div>
            )
          })
        }


      </div>

    </Modal>
     <div className="tradeBox">
      <div className="tradeBoxHeader"> 
          <h4>Swap</h4>
          <Popover
           content={settings}
           title="Settings"
           trigger="click"
           placement="buttomRight"
            >
          <SettingOutlined className='cog'/>
          </Popover>
         
      
      </div>
      <div className="inputs">
            <Input placeholder="0" value={tokenOneAmount}  onChange={onChangeToken} />
            <Input placeholder="0" value={tokenTwoAmount}  disabled='true'  />
            <div className="assetOne" onClick={()=>openModal(1)}>
              <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo"/>
              {tokenOne.ticker}
              <DownOutlined/>
            </div>
            <div className="switchButton" onClick={onSwitchToken}>
              <ArrowDownOutlined className="switchArrow"/>
            </div>
            <div className="assetTwo" onClick={()=>openModal(2)}>
            <img src={tokenTwo.img} alt="assetTwoLogo" className="assetLogo"/>
            {tokenTwo.ticker}
              <DownOutlined/>
            </div>
          </div>

       <div className="swapButton" onClick={fetchDexSwap} disabled={!tokenOneAmount}>Swap</div>


    </div>
    </>
   
  )
}

export default Swap