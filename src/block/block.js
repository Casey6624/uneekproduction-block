/**
 * BLOCK: uneekproduction-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS & icons
import './style.scss';
import './editor.scss';
import icons from './icons';

//  Components
import FacebookLogo from "../SharedComponents/FacebookLogo"
import GalleryUpload from "../SharedComponents/GalleryUpload"
import ShareLogo from "../SharedComponents/ShareLogo"
import LikeLogo from "../SharedComponents/LikeLogo"

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload, Editable, TextControl } = wp.editor;
const { Button } = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-uneekproduction-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'uneekproduction-block' ), // Block title.
	icon: 'tickets', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'uneekproduction-block' ),
		__( 'production' ),
		__( 'uneek' ),
	],
	attributes: {
		productionTitle: {
			type: "array",
			source: "children",
			selector: ".productionTitle"
		},
		productionDescription: {
			type: "array",
			source: "children",
			selector: ".productionDescription"
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.prodImg',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: '.prodImg',
		},
		facebookUrl: {
			type: 'string',
			source: 'attribute',
			selector: ".facebookUrl",
			attribute: "href",
			default: ""
		},
		youtubeTrailerUrl: {
			type: 'string',
			source: 'html',
			selector: ".youtubeTrailerUrl"
		},
		youtubeFullLengthUrl: {
			type: 'string',
			source: 'html',
			selector: ".youtubeFullLengthUrl"
		},
		imgURL2: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.prodImg2',
		},
		imgID2: {
			type: 'number',
		},
		imgAlt2: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: '.prodImg2',
		},
		// Campaign ID
		indiegogoAPI: {
			type: "array",
			source: "children",
			selector: ".indiegogoAPI"
		},
		// Success / Error Message in the editor
		indieGoGoErrorOrSuccess: {
			type: "array",
			source: "children",
			selector: ".indieGoGoErrorOrSuccess"
		},
		// API Data begins here
		title: {
			type: "array",
			source: "children",
			selector: ".title"
		},
		fundProgress: {
			type: "array",
			source: "children",
			selector: ".fundProgress"
		},
		
		funding_ends_at: {
			type: "array",
			source: "children",
			selector: ".funding_ends_at"
		},
		tagline: {
			type: "array",
			source: "children",
			selector: ".tagline"
		},
		web_url: {
			type: 'string',
			source: 'attribute',
			selector: ".web_url",
			attribute: "href"
		},
		image_types: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: ".image_types"
		}
	},
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function(props) { 
		const { attributes } = props; 
		// Change Handlers
		const onChangeProdTitle = value => props.setAttributes({productionTitle: value})
		const onChangeProdDescription = value => props.setAttributes({productionDescription: value})
		const onChangeYTTrailerUrl = value => props.setAttributes({ youtubeTrailerUrl: value })
		const onChangeYTFullLengthUrl = value => props.setAttributes({ youtubeFullLengthUrl: value })

		const onChangeIndiegogo = value => {

			console.log({value})

			value = value[0].trim()
			props.setAttributes({ indiegogoAPI: value })
		}

		const onChangeFBUrl = function(value){

			value = value.trim()

			// Here we need to check if facebook root URL has been appended yet, if it hasn't add it, if it has then skip adding it
			if(value.includes("https://www.facebook.com/") && value != ""){{
				props.setAttributes({ facebookUrl: value })
			}}else if(!value.includes("https://www.facebook.com/" && value != "")){
				value = `https://www.facebook.com/${value}`
				props.setAttributes({ facebookUrl: value })
			}else{
				props.setAttributes({ facebookUrl: value })
			}
		}


		const { attributes: { imgID, imgURL, imgAlt, imgID2, imgURL2, imgAlt2 },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
			}

			const onSelectImage2 = img => {
                setAttributes( {
                    imgID2: img.id,
                    imgURL2: img.url,
                    imgAlt2: img.alt,
                } );
            };
            const onRemoveImage2 = () => {
                setAttributes({
                    imgID2: null,
                    imgURL2: null,
                    imgAlt2: null,
                });
			}

			const callIndieGoGoAPI = () => {
				let api_token = "9986282a50bd2a3befe85098fe420f89c391d53f45812522cdab096f14618794"
								
				//let campaignID = "2478659"
				let campaignID = attributes.indiegogoAPI[0]
				let api_url = `https://api.indiegogo.com/1/campaigns/${campaignID}.json?api_token=${api_token}`
		
				fetch(api_url)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					if(data.error){
						setAttributes({indieGoGoErrorOrSuccess: `Oops! Couldn't find that campaign. Recieved Error: ${data.error}`})
                    	return Promise.reject()
					}else{
						let { collected_funds, goal, funding_ends_at, currency, image_types, title, tagline, web_url } = data.response

						image_types = image_types.baseball_card

						let fundProgress = `We have raised ${currency.symbol}${collected_funds} of our goal ${currency.symbol}${goal}`
						setAttributes({indieGoGoErrorOrSuccess: "Valid campaign found!", fundProgress, funding_ends_at, image_types, title, tagline, web_url})
					}
					
				}) 
				.catch(error => {
					console.log(`API Error! ${error}`)
                })
					
				
			}
			
		return (
			<div className={ className }>
				<RichText 
				className="productionTitle"
				id="prodTitleEditor"
				tagName="h1"
				placeholder={__("Production Title")}
				value={attributes.productionTitle}
				onChange={onChangeProdTitle}
				/>
				<RichText 
				className="productionDescription"
				id="prodDescEditor"
				tagName="p"
				placeholder={__("Production Description")}
				value={attributes.productionDescription}
				onChange={onChangeProdDescription}
				/>
				<RichText 
				className="facebookUrl"
				id="prodFBEditor"
				tagName="p"
				placeholder={__("Enter Facebook Page name: E.g www.facebook.com/<THIS PART AFTER THE SLASH>")}
				label="Facebook Page URL"
				value={attributes.facebookUrl}
				multiline = { false }
				onChange={onChangeFBUrl}
				/>
				<RichText 
				className="youtubeTrailerUrl"
				id="prodYTEditor"
				tagName="p"
				placeholder={__("YouTube Pilot URL")}
				value={attributes.youtubeTrailerUrl}
				onChange={onChangeYTTrailerUrl}
				/>
				<RichText 
				className="youtubeFullLengthUrl"
				id="prodYTEditor"
				tagName="p"
				placeholder={__("YouTube Full Length URL")}
				value={attributes.youtubeFullLengthUrl}
				onChange={onChangeYTFullLengthUrl}
				/>
				<RichText 
				className="indiegogoAPI"
				id="indiegogoAPI"
				tagName="p"
				placeholder={__("Please enter IndieGoGo Campaign ID")}
				value={attributes.indiegogoAPI}
				onChange={onChangeIndiegogo}
				/>
				<p className="indieGoGoErrorOrSuccess">{attributes.indieGoGoErrorOrSuccess}</p>
				<button
				className="components-button button button-large" 
				onClick={callIndieGoGoAPI}
				>
				{icons.submit}
				&nbsp;
				Submit Campaign 
				</button>
				
				{ ! imgID ? (
<MediaUpload
className="prodImg"
	onSelect={ onSelectImage }
	type="image"
	value={ imgID }
	render={ ( { open } ) => (
		<Button
			className={ "button button-large" }
			onClick={ open }
		>
			{ icons.upload }
			{ __( ' Upload Image', 'jsforwpblocks' ) }
		</Button>
	) }
>
</MediaUpload>

) : (

<p class="image-wrapper">
	<img
		src={ imgURL }
		alt={ imgAlt }
	/>

	{ isSelected ? (

		<Button
			className="remove-image"
			onClick={ onRemoveImage }
		>
			{ icons.remove }
		</Button>

	) : null }

</p>
)}

{ ! imgID2 ? (
	<MediaUpload
	className="prodImg"
		onSelect={ onSelectImage2 }
		type="image"
		value={ imgID2 }
		render={ ( { open } ) => (
			<Button
				className={ "button button-large" }
				onClick={ open }
			>
				{ icons.upload }
				{ __( ' Upload Image', 'jsforwpblocks' ) }
			</Button>
		) }
	>
	</MediaUpload>
	
	) : (
	
	<p class="image-wrapper">
		<img
			src={ imgURL2 }
			alt={ imgAlt2 }
		/>
	
		{ isSelected ? (
	
			<Button
				className="remove-image"
				onClick={ onRemoveImage2 }
			>
				{ icons.remove }
			</Button>
	
		) : null }
	
	</p>
	)}

			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: props =>{

		let { imgURL, imgAlt, imgURL2, imgAlt2, productionTitle, productionDescription, facebookUrl, youtubeTrailerUrl, youtubeFullLengthUrl, fundProgress, funding_ends_at, currency, image_types, title, tagline, web_url } = props.attributes
		
		let facebookRootUrl = "https://www.facebook.com/"

		return (
			<div>
				<div className="titleAndFBLink">
					<div className="productionTitle" id="productionTitle"> {productionTitle}</div>
					<div className="fbAndshareIcons">
					{facebookUrl != facebookRootUrl ? <a className="facebookUrl" href={`${facebookUrl}`} ><FacebookLogo/></a> : null}
					{facebookUrl != facebookRootUrl ? <a href={`https://www.facebook.com/sharer/sharer.php?u=${`${facebookUrl}`}`} > <ShareLogo /> </a> : null}
					{facebookUrl != facebookRootUrl ? <a href={`https://www.facebook.com/plugins/like.php?href=${`${facebookUrl}`}`} > <LikeLogo /> </a> : null}
					</div>
				</div>
			<div className="productionDescription" id="productionDescription"> {productionDescription}</div>
				<img id="artworkContainer" className="prodImg" src={ imgURL } alt={ imgAlt } />
				<img id="artworkContainer" className="prodImg2" src={ imgURL2 } alt={ imgAlt2 } />
			{youtubeTrailerUrl ? <h2>TRAILER: </h2> : null} <p className="youtubeTrailerUrl">{youtubeTrailerUrl}</p>
			{youtubeFullLengthUrl ? <h2>FULL LENGTH FEATURE: </h2> : null} <p className="youtubeFullLengthUrl">{youtubeFullLengthUrl}</p>
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
		</div>
		);
		
	},
} );
