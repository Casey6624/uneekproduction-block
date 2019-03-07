import React, { Component } from "react"

class indiegogo extends Component{

    componentDidMount(){

        let api_token = "9986282a50bd2a3befe85098fe420f89c391d53f45812522cdab096f14618794"

        let access_token = "03403e8ccd70aee642eb6da1d501b19fefc622646c1a308289d9963b2cbcf921"
        
        let campaignID = "2478659"
        
        let api_url = `https://api.indiegogo.com/1/campaigns/${campaignID}.json?api_token=${api_token}`

        fetch(api_url)
        .then(res => res.json())
        .then(data => {
            this.setState(data)
        })
    }

    render(){
        let {collected_funds, goal, category, funding_ends_at, currency, image_types, title, description_html, web_url} = state.data

        return(
            <div>
                <h1>INDIEGOGO</h1>
                <p>{`We have raised ${collected_funds} of our goal ${goal}`}</p>
            </div>
        )
    }
}


export default indiegogo;