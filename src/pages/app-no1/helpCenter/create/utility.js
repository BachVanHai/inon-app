export let selectErrorStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "13px",
            opacity: "0.5"
        };
    }
  }
  
  export let selectNormalStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "12px",
            opacity: "0.5"
        };
    }
  }
  

  export const CHTG = 'CHTG'
  export const HDSD = 'HDSD'
  export const TLNV = 'TLNV'
  export const PARTNER = 'PARTNER'
  export const INDIVIDUAL = 'INDIVIDUAL'
  export const ALL = "ALL"
