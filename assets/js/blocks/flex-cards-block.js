const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	PanelColorSettings,
} = wp.editor;
const {
	TextControl,
} = wp.components;

// Flex Cards Block
registerBlockType("custom-block-plugin/flex-cards-block", {
	title: "Flex Cards Block",
	icon: "grid-view",
	category: "common",
	attributes: {
		flexCards: {
			type: "array",
			default: [
				{ title: "", link: "" },
				{ title: "", link: "" },
				{ title: "", link: "" },
				{ title: "", link: "" },
			],
		},
		blocksPerRow: {
			type: "string",
			default: "2",
		},
		blockTitle: {
			type: "string",
			default: "",
		},
		blockText: {
			type: "string",
			default: "",
		},
		blockLink: {
			type: "string",
			default: "",
		},
	},
	edit: (props) => {
		const {
			attributes: {
				flexCards,
				backgroundColor,
				blockTitle,
				blockText,
				blockLink,
			},
			setAttributes,
		} = props;

		// Handler for title and link change in each card
		const onCardChange = (newTitle, newLink, index) => {
			const updatedCards = [...flexCards];
			updatedCards[index] = {
				...updatedCards[index],
				title: newTitle,
				link: newLink,
			};
			setAttributes({ flexCards: updatedCards });
		};

		// Handler for block title change
		const onBlockTitleChange = (newTitle) => {
			setAttributes({ blockTitle: newTitle });
		};

		// Handler for block text change
		const onBlockTextChange = (newText) => {
			setAttributes({ blockText: newText });
		};

		// Handler for block link change
		const onBlockLinkChange = (newLink) => {
			setAttributes({ blockLink: newLink });
		};

		// Handler for background color change
		const onBackgroundColorChange = (newColor) => {
			setAttributes({ backgroundColor: newColor });
		};

		return (
			<>
				<InspectorControls>
					{/* Color control for selecting background color */}
					<PanelColorSettings
						title="Background Color"
						initialOpen={true}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: onBackgroundColorChange,
								label: "Background Color",
							},
						]}
					/>
				</InspectorControls>

				{/* Displaying the block */}
				<div
					className={`flex-cards__wrapper admin-edit`}
					style={{ backgroundColor: backgroundColor }}
				>
					<div className="flex-cards__inner">
						<div className="flex-cards__left-column">
							<div className="flex-cards__column-inner">
								<RichText
									className="flex-cards__block-title"
									tagName="h2"
									value={blockTitle}
									onChange={onBlockTitleChange}
									placeholder="Enter block title"
								/>
								<RichText
									className="flex-cards__block-text"
									tagName="p"
									value={blockText}
									onChange={onBlockTextChange}
									placeholder="Enter block text"
								/>
								<RichText
									className="flex-cards__block-link"
									tagName="a"
									value={blockLink}
									onChange={onBlockLinkChange}
									placeholder="Enter block link"
								/>
							</div>
						</div>
						<div className="flex-cards__right-column">
							<div className="flex-cards__grid">
								{flexCards.map((card, index) => (
									<div key={index} className="flex-cards__item">
										<div className="flex-cards__item-inner">
											<RichText
												className="flex-cards__title"
												tagName="h2"
												value={card.title}
												onChange={(newTitle) =>
													onCardChange(newTitle, card.link, index)
												}
												placeholder="Enter title"
											/>
											<TextControl
												className="flex-cards__link"
												value={card.link}
												onChange={(newLink) =>
													onCardChange(card.title, newLink, index)
												}
												placeholder="Enter link"
											/>
											<svg
												className="flex-cards__arrow"
												width="117"
												height="102"
												viewBox="0 0 117 102"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M117.006 75.3218V22.7625V0.349609H94.7453H42.5385V22.7625H79.0956L0.672607 101.717L32.0623 101.809L94.7453 38.6985V75.3218H117.006Z"
													fill="#404041"
												/>
											</svg>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},
	save: (props) => {
		const {
			attributes: {
				flexCards,
				blockTitle,
				blockText,
				blockLink,
				backgroundColor,
			},
		} = props;

		return (
			<div
				className={`flex-cards__wrapper`}
				style={{ backgroundColor: backgroundColor }}
			>
				<div className="flex-cards__inner">
					<div className="flex-cards__left-column">
						<div className="flex-cards__column-inner">
							<h2 className="flex-cards__block-title">{blockTitle}</h2>
							<p className="flex-cards__block-text">{blockText}</p>
							<a href={blockLink} className="flex-cards__block-link">
								Read More
							</a>
						</div>
					</div>
					<div className="flex-cards__right-column">
						<div className="flex-cards__grid">
							{flexCards.map((card, index) => (
								<a key={index} href={card.link} className="flex-cards__item">
									<div className="flex-cards__item-inner">
										<h2 className="flex-cards__title">{card.title}</h2>

										<svg
											className="flex-cards__arrow"
											width="117"
											height="102"
											viewBox="0 0 117 102"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M117.006 75.3218V22.7625V0.349609H94.7453H42.5385V22.7625H79.0956L0.672607 101.717L32.0623 101.809L94.7453 38.6985V75.3218H117.006Z"
												fill="#404041"
											/>
										</svg>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
});