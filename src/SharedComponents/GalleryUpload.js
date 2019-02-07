/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const {
	IconButton,
	DropZone,
	FormFileUpload,
	PanelBody,
	Toolbar,
	withNotices,
} = wp.components;
const {
	MediaPlaceholder,
	mediaUpload,
} = wp.editor;

/**
 * Gallery Image Component
 */
class GalleryUpload extends Component {

	constructor() {
		super( ...arguments );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );
	}

	uploadFromFiles( event ) {
		this.addFiles( event.target.files );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes } = this.props;
		mediaUpload( {
			allowedTypes: helper.ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( images ) => {
				setAttributes( {
					images: currentImages.concat( images ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	render() {

		return (
			<Fragment>
				<li className="blockgallery--item blockgallery--item-uploader">
					<div>
						<FormFileUpload
							multiple
							isLarge
							onChange={ this.uploadFromFiles }
							accept="image/*"
							icon="insert"
						>
							<span>{ __( 'Upload an image' ) }</span>
						</FormFileUpload>
					</div>
				</li>
			</Fragment>
		)
	}
}

export default GalleryUpload;