<script setup lang="ts">
	import { ref } from 'vue'

	const supportData = [{
			image: "/assets/images/avatarchat.png",
			phone: "34631831383",
			message: 'Hola, estoy interesado, necesito más información',
			name: 'Sahar Darya',
			role: 'Sales Support',
			class: 'user-1'
		},
		{
			image: "/assets/images/man.jpg",
			phone: "34631831383",
			message: 'Please help me! I have got wrong product - ORDER ID is : #654321485',
			name: 'Yolduz Rafi',
			role: 'Technical Support',
			class: 'user-2'
		},
		{
			image: "/assets/images/avatarchat.png",
			phone: "34631831383",
			message: 'Please help me! I have got wrong product - ORDER ID is : #654321485',
			name: 'Khadija Mehr',
			role: 'Bussiness Support',
			class: 'user-3'
		},
		{
			image: "/assets/images/avatarchat.png",
			phone: "34631831383",
			message: 'Please help me! I have got wrong product - ORDER ID is : #654321485',
			name: 'Luice Jain',
			role: 'Sales Support',
			class: 'user-4'
		}
	]
	
	const RedirectChat = (support: any) => {
		let urlChat = 'https://wa.me/' + support.phone + '/?text=' + support.message

		window.open(urlChat, '-blank');
		return urlChat;
	}

	let showChat = ref(false)
	const handleShow = () => {
		showChat.value = !showChat.value
	}
	
	// Redirect to whatsapp on a single click
	const PHONE = "34631831383";
	const MESSAGE = "Hola, estoy interesado, necesito más información";
	let wAppUrl = 'https://wa.me/' + PHONE + '/?text=' + MESSAGE
</script>

<template>
	<div class="wc-style2">
		<div class="wc-panel">
			<!-- Floating Button -->
			<a :href="wAppUrl" class="wc-button" id="wcBtn" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 2 26 24">
					<path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18c.21-.58.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01Z" />
				</svg>
			</a>

			<!-- User Contact List -->
			<!--<ul class="wc-menu" v-if="showChat">
				<template v-for="support in supportData.slice(0,2)">
					<li>
						<a ref="#" @click="RedirectChat(support)" class="wc-list wc-list-sm scale-transition">
							<img :src="support.image" alt="" />
							<span class="tooltiptext tt05">{{support.name}}</span>
						</a>
					</li>
				</template>
				/ End Single Contact List
			</ul>-->
		</div>
	</div>
</template>

<style lang="scss" scoped>
	/* WhatsChat Main Panel */
	.wc-menu {
		z-index: 1000;
	}

	.wc-style2 {
		letter-spacing: 0.1px;
		font-family: 'Open Sans', "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	.wc-style2 .wc-panel {
		position: fixed;
		bottom: 10px;
		right: 1.90em;
		height: 70px;
		z-index: 100;
	}

	/* WhatsChat Floating Button */
	.wc-style2 .wc-panel .wc-button {
		display: inline-block;
		width: 46px;
		height: 46px;
		text-align: center;
		line-height: 48px;
		border: 1px solid #fff;
		border-radius: 50%;
		font-size: 40px;
		cursor: pointer;
	}

	.wc-style2 .wc-panel .wc-button svg {
		margin-top: 8px;
	}

	/* WhatsChat Chat List */
	.wc-style2 .wc-panel ul {
		position: absolute;
		right: 55px;
		left: auto;
		top: 17px;
		height: 100%;
		width: 500px;
		list-style: none;
		text-align: right;
		transform: translateY(-50%);

	}

	.wc-style2 .wc-panel ul li {
		display: inline-block;
		/*user img separation margin*/
		margin-right: 77px;
	}

	.wc-style2 .wc-panel .wc-list {
		display: inline-block;
		position: absolute;
		text-align: center;
		border-radius: 100%;
		cursor: pointer;

	}

	.wc-style2 .wc-panel .wc-list img {
		padding: 1px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 3px solid #09e072;
	}

	/* Common CSS */
	.wc-style2 .wc-panel .wc-button,
	.wc-style2 .wc-panel .wc-list,
	.wc-style2 .wc-panel .wc-list:hover img {
		-webkit-transition: all .3s ease-in-out;
		-moz-transition: all .3s ease-in-out;
		-ms-transition: all .3s ease-in-out;
		-o-transition: all .3s ease-in-out;
	}

	.wc-style2 .wc-panel .wc-button,
	.wc-style2 .wc-panel .wc-list img {
		box-shadow: 0 0 10px rgba(12, 12, 12, 0.3);
	}

	.wc-style2 .wc-panel .wc-button:hover,
	.wc-style2 .wc-panel .wc-list:hover img {
		box-shadow: 0px 0px 10px rgba(12, 12, 12, 0.5);
	}

	/* Scal Transition Effect */
	.wc-style2 .wc-panel .scale-transition {
		transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;
	}

	.wc-style2 .wc-panel .scale-transition .scale-out {
		transform: scale(0);
		transition: transform 0.2s !important;
	}

	.wc-style2 .wc-panel .scale-transition .scale-in {
		transform: scale(1);
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (max-width: 768px) {

		.wc-style2 .wc-panel ul {
			display: grid;
			right: -30px;
			top: -240px;
			width: 500px;
		}

		.wc-style2 .wc-panel ul li {
			padding: 30px;
			margin-right: 46px;
			margin-top: -10px;
		}

		/* Common CSS */
		.wc-style2 .wc-panel .wc-list i,
		.wc-style2 .wc-panel .wc-list .tooltiptext {
			display: none;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media screen and (min-width: 768px) {

		.wc-style2 .wc-panel .wc-list:hover i {
			display: block;
		}

		/* Tooltip On Profile Hover */
		.wc-style2 .wc-panel .wc-list .tooltiptext {
			visibility: hidden;
			position: absolute;
			padding: 5px;
			width: 95px;
			bottom: 115%;
			left: -28px;
			font-size: 12px;
			color: #fff;
			text-align: center;
			border-radius: 6px;
			background-color: #000;
			height: 25px;
			line-height: 15px;
			z-index: 1;
		}

		.wc-style2 .wc-panel .wc-list .tooltiptext::after {
			content: "";
			position: absolute;
			margin-left: -5px;
			top: 100%;
			left: 50%;
			border-width: 5px;
			border-style: solid;
			border-color: black transparent transparent transparent;
		}

		.wc-style2 .wc-panel .wc-list:hover .tooltiptext {
			visibility: visible;
		}

		/* Common CSS */
		.wc-style2 .wc-panel .wc-list:hover i,
		.wc-style2 .wc-panel .wc-list:hover .tooltiptext {
			-webkit-animation: wc-fadein 1s;
			-moz-animation: wc-fadein 1s;
			-ms-animation: wc-fadein 1s;
			-o-animation: wc-fadein 1s;
			animation: wc-fadein 1s;
		}
	}

	@keyframes wc-fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@-webkit-keyframes wc-fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@-moz-keyframes wc-fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@-ms-keyframes wc-fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@-o-keyframes wc-fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	/*==================================================
    Start WhatsChat Style2 CSS
====================================================*/
	.wc-style2 .wc-panel .wc-button {
		background: -webkit-linear-gradient(to right, #26C281, #09e072);
		background: -moz-linear-gradient(to right, #26C281, #09e072);
		background: -ms-linear-gradient(to right, #26C281, #09e072);
		background: -o-linear-gradient(to right, #26C281, #09e072);
		background: linear-gradient(to right, #26C281, #09e072);
	}

	.wc-style2 .wc-panel .wc-list img {
		background: #fff;
	}

	/* Common CSS */
	.wc-style2 .wc-panel .wc-button,
	.wc-style2 .wc-panel .wc-button:hover {
		color: #fff;
	}

	/*==================================================
    End WhatsChat Style2 CSS
====================================================*/
</style>
