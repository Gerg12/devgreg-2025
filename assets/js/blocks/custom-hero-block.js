const { registerBlockType } = wp.blocks;
const {
	RichText,
	MediaUpload,
	InspectorControls,
	BlockControls,
	ColorPalette,
} = wp.editor;
const {
	Button,
	RangeControl,
	PanelBody,
	Toolbar,
	PanelRow,
} = wp.components;

// Custom Hero Block
registerBlockType("custom-block-plugin/custom-hero-block", {
	title: "Custom Hero Block",
	icon: "shield",
	category: "common",
	attributes: {
		heroGeneralTitle: {
			type: "string",
			default: "Default Title",
			source: "html",
			selector: ".hero-general__title",
		},
		heroGeneralImage: {
			type: "string",
			default: null,
		},
		heroGeneralLogo: {
			type: "string",
			default: null,
		},
		defaultFontSize: {
			type: "number",
			default: 16,
		},
		fontSizeAbove768: {
			type: "number",
			default: 24,
		},
		textLines: {
			type: "array",
			default: [],
		},
		textColors: {
			type: "array",
			default: [],
		},
		selectedLineIndex: {
			type: "number",
			default: 0,
		},
	},
	edit: (props) => {
		const {
			attributes: {
				heroGeneralTitle,
				heroGeneralImage,
				heroGeneralLogo,
				defaultFontSize,
				fontSizeAbove768,
				textLines,
				textColors,
				selectedLineIndex,
			},
			setAttributes,
		} = props;

		const onTitleChange = (newTitle) => {
			setAttributes({ heroGeneralTitle: newTitle });
		};

		const onImageSelect = (media) => {
			setAttributes({ heroGeneralImage: media.url });
		};

		const onLogoImageSelect = (media) => {
			setAttributes({ heroGeneralLogo: media.url });
		};

		const addTextLine = () => {
			const newTextLines = [...textLines, ""];
			const newTextColors = [...textColors, "#000000"];
			setAttributes({ textLines: newTextLines, textColors: newTextColors });
		};

		const removeTextLine = (index) => {
			const newTextLines = [...textLines];
			const newTextColors = [...textColors];
			newTextLines.splice(index, 1);
			newTextColors.splice(index, 1);
			setAttributes({ textLines: newTextLines, textColors: newTextColors });
		};

		const onTextChange = (newValue, index) => {
			const newTextLines = [...textLines];
			newTextLines[index] = newValue;
			setAttributes({ textLines: newTextLines });
		};

		const onTextColorChange = (newColor) => {
			const newTextColors = [...textColors];
			newTextColors[selectedLineIndex] = newColor;
			setAttributes({ textColors: newTextColors });
		};

		const onSelectLine = (index) => {
			setAttributes({ selectedLineIndex: index });
		};

		return (
			<section className="hero-general-section">
				<BlockControls>
					<Toolbar>
						<MediaUpload
							onSelect={onImageSelect}
							type="image"
							value={heroGeneralImage}
							render={({ open }) => (
								<Button onClick={open} icon="format-image">
									Select Image
								</Button>
							)}
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody title="Font Size Settings">
						<RangeControl
							label="Default Font Size (px)"
							value={defaultFontSize}
							onChange={(value) => setAttributes({ defaultFontSize: value })}
							min={1}
							max={100}
						/>
						<RangeControl
							label="Font Size Above 768px (px)"
							value={fontSizeAbove768}
							onChange={(value) => setAttributes({ fontSizeAbove768: value })}
							min={1}
							max={100}
						/>
					</PanelBody>
					<PanelBody title="Text Line Color">
						{textLines.length > 0 && (
							<PanelRow>
								<ColorPalette
									value={textColors[selectedLineIndex]}
									onChange={onTextColorChange}
									colors={[
										{ name: "color1", color: "#6DB4B6" },
										{ name: "color2", color: "#FEBE34" },
										{ name: "color3", color: "#404041" },
									]}
								/>
							</PanelRow>
						)}
					</PanelBody>
				</InspectorControls>

				<div className="hero-general__image-box">
					<MediaUpload
						onSelect={onImageSelect}
						type="image"
						value={heroGeneralImage}
						render={({ open }) => <Button onClick={open}>Select Image</Button>}
					/>
					{heroGeneralImage && (
						<img
							src={heroGeneralImage}
							alt="Hero Image"
							style={{ maxWidth: "100%" }}
						/>
					)}
					<div className="hero-general__row">
						<div className="hero-general__column hero-general__logo-column">
							<div className="hero-general__logo-box">
								<MediaUpload
									onSelect={onLogoImageSelect}
									type="image"
									value={heroGeneralLogo}
									render={({ open }) => (
										<Button onClick={open}>Select Logo</Button>
									)}
								/>
								{heroGeneralLogo && (
									<img
										src={heroGeneralLogo}
										alt="Hero Logo"
										style={{ maxWidth: "100%" }}
									/>
								)}
							</div>
							<div className="text-lines">
								{textLines.map((line, index) => (
									<div
										key={index}
										className="text-line"
										onClick={() => onSelectLine(index)}
									>
										<RichText
											tagName="p"
											value={line}
											onChange={(newValue) => onTextChange(newValue, index)}
											placeholder="Enter text"
											style={{ color: textColors[index] }}
										/>
										<Button
											className="remove-line-button"
											onClick={() => removeTextLine(index)}
										>
											Remove Line
										</Button>
									</div>
								))}
								<Button className="add-line-button" onClick={addTextLine}>
									Add Line
								</Button>
							</div>
						</div>
						<div className="hero-general__column">
							<div className="hero-general-content">
								<div className="hero-general-content__inner">
									<RichText
										className="hero-general__title"
										tagName="p"
										value={heroGeneralTitle}
										onChange={onTitleChange}
										placeholder="Enter title"
										style={{ fontSize: `${fontSizeAbove768}px` }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	},
	save: (props) => {
		const {
			attributes: {
				heroGeneralTitle,
				heroGeneralImage,
				heroGeneralLogo,
				defaultFontSize,
				fontSizeAbove768,
				textLines,
				textColors,
			},
		} = props;

		const styles = `
			.hero-general__title {
				font-size: ${defaultFontSize}px;
			}

			@media (min-width: 768px) {
				.hero-general__title {
					font-size: ${fontSizeAbove768}px;
				}
			}
		`;

		return (
			<section className="hero-general-section">
				<style>{styles}</style>
				<div className="hero-general__image-box">
					{heroGeneralImage && (
						<img
							src={heroGeneralImage}
							alt="Hero Image"
							style={{ maxWidth: "100%" }}
						/>
					)}
					<div className="hero-general__row">
						<div className="hero-general__column hero-general__logo-column">
							<div className="hero-general__logo-box">
								{heroGeneralLogo && (
									<img
										src={heroGeneralLogo}
										alt="Hero Logo"
										style={{ maxWidth: "100%" }}
									/>
								)}
							</div>
							<div className="text-lines">
								{textLines.map((line, index) => (
									<p key={index} style={{ color: textColors[index] }}>
										{line}
									</p>
								))}
							</div>
						</div>
						<div className="hero-general__column hero-general-content">
							<div className="hero-general-content__inner">
								<p className="hero-general__title">{heroGeneralTitle}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	},
});