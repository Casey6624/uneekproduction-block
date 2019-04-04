import React from "react"

const IndiegogoFull = props => {

    let {title, fundProgress, image_types, tagline, web_url, funding_ends_at} = props

    return(
        <div className="indieGoGo">
			<h1 className="indieGoGoTitle">INDIEGOGO</h1>
			<h2 className="title">{title}</h2>
			<p className="fundProgress">{fundProgress}</p>
			<div className="imageAndTagline">
			<img className="image_types" src={image_types}/>
				<div className="textAndButton">
					<p className="tagline">{tagline}</p>
					<a className="web_url" href={`${web_url}`}> <button>VIEW ON INDIEGOGO</button></a>
					<p className="funding_ends_at">{funding_ends_at}</p>
				</div>
			</div>
		</div>
    )
}

export default IndiegogoFull