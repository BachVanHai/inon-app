import styled from 'styled-components'

export const LiveChatBox = styled.div`
  position: fixed;
  bottom: 30px;
  right: 15px;
  transition : all 2s ease-in-out;
  z-index: 999999;
`
export const IconChatCircle = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 15px 20px rgb(124 149 146 / 40%) !important;
  background-color: #d3e4cd;
  border : 1px solid #fff;
`
export const BoxSendSupportRequestStyled = styled.div`
  position: fixed;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  width: 600px;
  background-color: #fff;
  height: 100%;
  max-height: 400px;
  // padding: 10px;
  bottom: 2%;
  right: 2%;
  border-radius: 10px;
  border: 1px solid #106d5a;
  box-shadow: 0px 40px 60px rgb(134 149 146 / 40%) !important;
  @media (max-width: 768px) {
    &{
      width : 95%;
      bottom: 5%;
    }
  }
  .card{
    margin-bottom: 0;
  }
`
export const HeaderLiveChat = styled.div`
  height: 10%;
  width: 100%;
  padding: 10px 10px;
  background-color: #106d5a;
  border-radius: 8px 8px 0 0;
  color: #fff;
`
export const BodyLiveChat = styled.div`
  height: 90%;
  overflow: scroll;
  overflow-x: hidden;
  background-color: #fff;
  border-radius: 0px 0px 8px 8px;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  ::-webkit-scrollbar {
    width: 2px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #338955;
  }
  .react-ripples{
    width : 100%;
    // padding : 0 !important;
    button{
      width : 100%;
    }
  }
`
export const FooterLiveChat = styled.div`
  height: 10%;
  width: 100%;
  display : flex;
  justify-content : center;
  background-color : #106d5a;
  font-weight : bold;
  padding-top : 10px;
  border-radius: 0px 0px 8px 8px;
  color : #fff;
`
export const ButtonCloseLiveChat = styled.button`
  background: #ff0000;
  border-radius : 5px;
  border : none;
  color : #fff;
`
