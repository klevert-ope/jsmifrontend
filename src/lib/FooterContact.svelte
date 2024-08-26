<script lang="ts">
	let currentYear: number;
	const date = new Date();
	currentYear = date.getFullYear();

	const links: { path: string; label: string }[] = [
		{ path: '/', label: 'HOME' },
		{ path: '/news', label: 'NEWS' },
		{ path: '/community', label: 'COMMUNITY' },
		{ path: '/live', label: 'LIVE BROADCASTS' },
		{ path: '/about', label: 'ABOUT' },
		{ path: '/team', label: 'TEAM' },
		{ path: '/donate', label: 'DONATE' }
	];

	function handleNavigation(href: string) {
		setTimeout(() => {
			history.pushState({}, '', href);
			window.dispatchEvent(new Event('popstate'));
		}, 500);
	}
</script>

<section>
	<img
		alt="JSMI logo"
		height="85"
		src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1719775803/jsmi-logo_p7ay2j.png"
		width="85">
	<h5 class="font-xl text-orange margin-y-md">
		JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL
	</h5>
	<div class="navigation">
		<div class="menu">
			<ul class="place-center flex-col">
				{#each links as { path, label }}
					<li class="link">
						<a href={path} on:click={() => handleNavigation(path)}>{label}</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="socials">
			<ul class="flex-row place-center">
				<li class="social">
					<a href="https://www.facebook.com/profile.php?id=61554778936270"
						 target="_blank">
						<svg fill="#000000" height="34px" viewBox="0 0 48 48"
								 width="34px"
								 xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								 stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier"><title>Facebook-color</title>
								<desc>Created with Sketch.</desc>
								<defs></defs>
								<g fill="none" fill-rule="evenodd" id="Icons" stroke="none"
									 stroke-width="1">
									<g fill="#175CD3" id="Color-"
										 transform="translate(-200.000000, -160.000000)">
										<path
											d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
											id="Facebook"></path>
									</g>
								</g>
							</g>
						</svg>
					</a>
				</li>
				<li class="social">
					<a href="https://www.instagram.com/jehovahshammahministies"
						 target="_blank">
						<svg fill="none" height="34px" viewBox="0 0 32 32" width="34px"
								 xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								 stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<rect fill="url(#paint0_radial_87_7153)" height="28" rx="6"
											width="28" x="2"
											y="2"></rect>
								<rect fill="url(#paint1_radial_87_7153)" height="28" rx="6"
											width="28" x="2"
											y="2"></rect>
								<rect fill="url(#paint2_radial_87_7153)" height="28" rx="6"
											width="28" x="2"
											y="2"></rect>
								<path
									d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
									fill="white"></path>
								<path clip-rule="evenodd"
											d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
											fill="white"
											fill-rule="evenodd"></path>
								<path clip-rule="evenodd"
											d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
											fill="white"
											fill-rule="evenodd"></path>
								<defs>
									<radialGradient cx="0" cy="0"
																	gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
																	gradientUnits="userSpaceOnUse"
																	id="paint0_radial_87_7153"
																	r="1">
										<stop offset="0" stop-color="#B13589"></stop>
										<stop offset="0.79309" stop-color="#C62F94"></stop>
										<stop offset="1" stop-color="#8A3AC8"></stop>
									</radialGradient>
									<radialGradient cx="0" cy="0"
																	gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
																	gradientUnits="userSpaceOnUse"
																	id="paint1_radial_87_7153"
																	r="1">
										<stop offset="0" stop-color="#E0E8B7"></stop>
										<stop offset="0.444662" stop-color="#FB8A2E"></stop>
										<stop offset="0.71474" stop-color="#E2425C"></stop>
										<stop offset="1" stop-color="#E2425C"
													stop-opacity="0"></stop>
									</radialGradient>
									<radialGradient cx="0" cy="0"
																	gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
																	gradientUnits="userSpaceOnUse"
																	id="paint2_radial_87_7153"
																	r="1">
										<stop offset="0.156701" stop-color="#406ADC"></stop>
										<stop offset="0.467799" stop-color="#6A45BE"></stop>
										<stop offset="1" stop-color="#6A45BE"
													stop-opacity="0"></stop>
									</radialGradient>
								</defs>
							</g>
						</svg>
					</a>
				</li>
				<li class="social">
					<a href="https://www.youtube.com/channel/UC_xgUSUeznyBct-tseuH8hA"
						 target="_blank">
						<svg fill="#000000" height="34px" viewBox="0 -7 48 48"
								 width="34px"
								 xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								 stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier"><title>Youtube-color</title>
								<desc>Created with Sketch.</desc>
								<defs></defs>
								<g fill="none" fill-rule="evenodd" id="Icons" stroke="none"
									 stroke-width="1">
									<g fill="#CE1312" id="Color-"
										 transform="translate(-200.000000, -368.000000)">
										<path
											d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z"
											id="Youtube"></path>
									</g>
								</g>
							</g>
						</svg>
					</a>
				</li>
				<li class="social">
					<a href="https://www.tiktok.com/@jehovahshammah32?lang=en"
						 target="_blank">
						<svg fill="#000000" height="34px" viewBox="0 0 250 250"
								 width="34px" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								 stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<g clip-rule="evenodd" fill-rule="evenodd">
									<path
										d="M25 0h200c13.808 0 25 11.192 25 25v200c0 13.808-11.192 25-25 25H25c-13.808 0-25-11.192-25-25V25C0 11.192 11.192 0 25 0z"
										fill="#010101"></path>
									<path
										d="M156.98 230c7.607 0 13.774-6.117 13.774-13.662s-6.167-13.663-13.774-13.663h-2.075c7.607 0 13.774 6.118 13.774 13.663S162.512 230 154.905 230z"
										fill="#ee1d51"></path>
									<path
										d="M154.717 202.675h-2.075c-7.607 0-13.775 6.118-13.775 13.663S145.035 230 152.642 230h2.075c-7.608 0-13.775-6.117-13.775-13.662s6.167-13.663 13.775-13.663z"
										fill="#66c8cf"></path>
									<ellipse cx="154.811" cy="216.338" fill="#010101" rx="6.699"
													 ry="6.643"></ellipse>
									<path
										d="M50 196.5v6.925h8.112v26.388h8.115v-26.201h6.603l2.264-7.112zm66.415 0v6.925h8.112v26.388h8.115v-26.201h6.603l2.264-7.112zm-39.81 3.93c0-2.17 1.771-3.93 3.959-3.93 2.19 0 3.963 1.76 3.963 3.93s-1.772 3.93-3.963 3.93c-2.188-.001-3.959-1.76-3.959-3.93zm0 6.738h7.922v22.645h-7.922zM87.924 196.5v33.313h7.925v-8.608l2.453-2.248L106.037 230h8.49l-11.133-16.095 10-9.733h-9.622l-7.923 7.86V196.5zm85.47 0v33.313h7.926v-8.608l2.452-2.248L191.509 230H200l-11.133-16.095 10-9.733h-9.622l-7.925 7.86V196.5z"
										fill="#ffffff"></path>
									<path
										d="M161.167 81.186c10.944 7.819 24.352 12.42 38.832 12.42V65.755a39.26 39.26 0 0 1-8.155-.853v21.923c-14.479 0-27.885-4.601-38.832-12.42v56.835c0 28.432-23.06 51.479-51.505 51.479-10.613 0-20.478-3.207-28.673-8.707C82.187 183.57 95.23 189.5 109.66 189.5c28.447 0 51.508-23.047 51.508-51.48V81.186zm10.06-28.098c-5.593-6.107-9.265-14-10.06-22.726V26.78h-7.728c1.945 11.09 8.58 20.565 17.788 26.308zm-80.402 99.107a23.445 23.445 0 0 1-4.806-14.256c0-13.004 10.548-23.547 23.561-23.547a23.6 23.6 0 0 1 7.147 1.103V87.022a51.97 51.97 0 0 0-8.152-.469v22.162a23.619 23.619 0 0 0-7.15-1.103c-13.013 0-23.56 10.543-23.56 23.548 0 9.195 5.272 17.157 12.96 21.035z"
										fill="#ee1d52"></path>
									<path
										d="M153.012 74.405c10.947 7.819 24.353 12.42 38.832 12.42V64.902c-8.082-1.72-15.237-5.942-20.617-11.814-9.208-5.743-15.843-15.218-17.788-26.308H133.14v111.239c-.046 12.968-10.576 23.468-23.561 23.468-7.652 0-14.45-3.645-18.755-9.292-7.688-3.878-12.96-11.84-12.96-21.035 0-13.005 10.547-23.548 23.56-23.548 2.493 0 4.896.388 7.15 1.103V86.553c-27.945.577-50.42 23.399-50.42 51.467 0 14.011 5.597 26.713 14.68 35.993 8.195 5.5 18.06 8.707 28.673 8.707 28.445 0 51.505-23.048 51.505-51.479z"
										fill="#ffffff"></path>
									<path
										d="M191.844 64.902v-5.928a38.84 38.84 0 0 1-20.617-5.887 38.948 38.948 0 0 0 20.617 11.815zM153.439 26.78a39.524 39.524 0 0 1-.427-3.198V20h-28.028v111.24c-.045 12.967-10.574 23.467-23.56 23.467-3.813 0-7.412-.904-10.6-2.512 4.305 5.647 11.103 9.292 18.755 9.292 12.984 0 23.515-10.5 23.561-23.468V26.78zm-44.864 59.773v-6.311a51.97 51.97 0 0 0-7.067-.479C73.06 79.763 50 102.811 50 131.24c0 17.824 9.063 33.532 22.835 42.772-9.083-9.28-14.68-21.982-14.68-35.993 0-28.067 22.474-50.889 50.42-51.466z"
										fill="#69c9d0"></path>
									<path
										d="M154.904 230c7.607 0 13.775-6.117 13.775-13.662s-6.168-13.663-13.775-13.663h-.188c-7.607 0-13.774 6.118-13.774 13.663S147.109 230 154.716 230zm-6.792-13.662c0-3.67 3-6.643 6.7-6.643 3.697 0 6.697 2.973 6.697 6.643s-3 6.645-6.697 6.645c-3.7-.001-6.7-2.975-6.7-6.645z"
										fill="#ffffff"></path>
								</g>
							</g>
						</svg>
					</a>
				</li>
				<li class="social">
					<a href="https://chat.whatsapp.com/L4iGhHCu7jfDKWWUlObWm5"
						 target="_blank">
						<svg aria-label="WhatsApp" fill="#000000"
								 height="34px" role="img" viewBox="0 0 512 512" width="34px"
								 xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								 stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<rect fill="#25d366" height="512" rx="15%" width="512"></rect>
								<path d="M123 393l14-65a138 138 0 1150 47z" fill="#25d366"
											stroke="#ffffff"
											stroke-width="26"></path>
								<path
									d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
									fill="#ffffff"></path>
							</g>
						</svg>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="place-center">
		<small class="font-xs font-medium">
			JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL &copy; {currentYear} All rights
			reserved.
		</small>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 90svh;
		padding-right: 15px;
		padding-left: 15px;
		background-color: var(--black);
		}

	.font-xl {
		font-size: var(--font-size-xl);
		}

	.font-xs {
		font-size: var(--font-size-sm);
		}

	.font-medium {
		font-weight: 500;
		}

	.margin-y-md {
		margin-top: var(--md-px20);
		margin-bottom: var(--sm-px15);
		}

	.text-orange {
		color: var(--blue);
		}

	.place-center {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		}

	small {
		margin-bottom: var(--lg-px40);
		color: var(--yellow);
		}

	h5 {
		font-family: 'LeArchitect', sans-serif;
		max-width: 500px;
		}

	img {
		margin-top: var(--md-px20);
		}

	.menu a {
		margin-bottom: 10px;
		cursor: pointer;
		text-decoration: none;
		outline: none;
		}

	.socials {
		margin-top: var(--md-px20);
		margin-bottom: var(--md-px20);
		}

	a {
		font-size: var(--font-size-lg);
		color: var(--white);
		}

	a:hover {
		color: var(--yellow);
		}

	.navigation {
		height: auto;
		padding-top: var(--lg-px40);
		padding-bottom: var(--lg-px40);
		}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		max-width: 400px;
		margin: 0 auto;
		}

	.flex-col {
		display: flex;
		flex-direction: column;
		}

	.link {
		margin-bottom: var(--md-px20);
		}

	li {
		list-style: none;
		}
</style>
