import styled from 'styled-components'

export const StylishButton = styled.button`
  background: #3F88C5;
  border-radius: 4px;
  border: 2px solid #BBBFCA;
  color: #F9F9F9;
  margin: 0.5em 0.15em;
  padding: 0.25em 0.5em;

  &:hover {
    background: #F9F9F9;
    border: 2px solid #E94F37;
    color: #3F88C5;
  }

  &:disabled {
    background: #DCDCDC;
    border: 2px solid #BBBFCA;
    color: #696969;
  }

  .thumbs {
    font-size: 1.2em;
  }
`
export const BoardButton = styled(StylishButton)`
  margin: 0.5em 1em;
  padding: 0.25em 1em;
`
export const BasicWrapper = styled.div`
   background: #F4F4F2;
   border-radius: 3px;
   border: 1px solid #BBBFCA;
   margin: 0.75em 1em;
   padding: 0.25em 1em;
   min-width: 500px;

   & p {
     padding-left: 1em;
     padding-top: 1em;
     margin-bottom: 0.5em;
   }
   & h3 {
     padding-left: 1rem;
     padding-top: ${props => props.auth ? '.75em' : '0em'};
   }
   & h6 {
     padding-left: 1em;
   }
   &:hover {
     border: 1px solid #82858D;
   }

   & label {
      padding-left: 1em;
      padding-top: 1em;
    }
 `

export const GridWrapper = styled.div`
   background: #F4F4F2;
   border-radius: 3px;
   border: 1px solid #BBBFCA;
   display: grid;
   grid-template-columns: [first] 75% [line2] 25% [end];
   margin: 11px 1em;
   padding: 0.25em 1em;

   &:hover {
     border: 1px solid #82858D;
   }
 `

export const FormWrapper = styled.form`
   background: #F4F4F2;
   border-radius: 3px;
   border: 1px solid #BBBFCA;
   display: flex;
   flex-direction: row;
   margin: 1em 1em;
   padding: 0.25em 1em;
 `

export const ButtonWrapper = styled.div`
   align-self: center;
   justify-self: end;
 `

export const Wrapper = styled.div`
   border-radius: 4px;
   margin: 1em 1em;
   padding: 0.25em 1em;
   min-width: 500px;
 `

export const LikeButtonWrapper = styled.div`
   border-radius: 4px;
   margin: 0 auto;
   padding: 0.25em 1em;
   grid-template-rows: [row1-start] 5% [row1-end] 20% [second-line] auto [last-line];

   & div {
     height: 20px;
     width: 20px;
     margin: 0 auto;
     text-align: center;
   }
 `
export const LikeFeatureWrapper = styled.div`
    align-content: center;
    border-radius: 4px;
    margin: 0 auto;
    padding: 0.25em 1em;
  `

export const PostWrapper = styled.div`
   margin: 0.5em 0.5em;
   word-wrap: break-word;

   & p {
     margin-bottom: 0.5em;
   }
 `

export const ContentWrapper = styled.div`
   margin: 0.5em 0.5em;
   word-wrap: break-word;
 `
