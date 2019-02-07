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
import FacebookLogo from "../SharedComponents/FacebookLogo";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload, Editable } = wp.editor;
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
			type: "string",
			source: "children",
			selector: ".productionTitle"
		},
		productionDescription: {
			type: "string",
			source: "children",
			selector: ".productionDescription"
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		facebookUrl: {
			type: 'string',
			source: 'children',
			selector: ".facebookUrl"
		},
		youtubeUrl: {
			type: 'string',
			source: 'children',
			selector: ".youtubeUrl"
		},
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function(props){
		const { attributes } = props; 
		// Change Handlers
		const onChangeProdTitle = value => props.setAttributes({productionTitle: value})
		const onChangeProdDescription = value => props.setAttributes({productionDescription: value})
		const onChangeFBUrl = value => props.setAttributes({ facebookUrl: value })
		const onChangeYTUrl = value => props.setAttributes({ youtubeUrl: value })

		const { attributes: { imgID, imgURL, imgAlt },
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
			
		return (
			<div className={ props.className }>
				<RichText 
				tagName="h1"
				placeholder={__("Production Title")}
				value={attributes.productionTitle}
				onChange={onChangeProdTitle}
				/>
				<RichText 
				tagName="p"
				placeholder={__("Production Description")}
				value={attributes.productionDescription}
				onChange={onChangeProdDescription}
				/>
				<RichText 
				tagName="p"
				placeholder={__("Facebook Page URL")}
				value={attributes.facebookUrl}
				onChange={onChangeFBUrl}
				/>
				<RichText 
				tagName="p"
				placeholder={__("YouTube Pilot URL")}
				value={attributes.youtubeUrl}
				onChange={onChangeYTUrl}
				/>
				
				{ ! imgID ? (
<MediaUpload
className={"prodImg"}
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
		const { imgURL, imgAlt, productionTitle, productionDescription, facebookUrl, youtubeUrl } = props.attributes;
		
		return (
			<div>
			<p id="productionTitle"> {productionTitle}</p>
			<p id="productionDescription"> {productionDescription}</p>
			<img className="productionImages" src={ imgURL } alt={ imgAlt } />
			<p id="">{youtubeUrl}</p>
			{facebookUrl ? <a href={`${facebookUrl}`} target="_blank"><FacebookLogo/></a> : null}
		</div>
		);
		
	},
} );
