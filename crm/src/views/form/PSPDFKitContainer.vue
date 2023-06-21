<script setup lang="ts">
//https://github.com/PSPDFKit-labs/pspdfkit-template-generation-from-pdf/blob/master/index.js
import PSPDFKit from "pspdfkit";
import axios from 'axios';

import res from '@/assets/test/data.json'



const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
    }
});


const baseUrl = `https://api.aythen.com/static/src/assets/test/`;
const searchQuery = "Company Ltd.";



const loadProtectedPDF = async (documentUrl) => {
	// Base64 encode your credentials and set them as an `Authorization` header.
	//const headers = new Headers();
	//const encodedCredentials = btoa(`${username}:${password}`);
	//headers.set("Authorization", `Basic ${encodedCredentials}`);

	// Fetch the PDF and read the response as an `ArrayBuffer`.
	//const pdfResponse = await fetch(documentUrl, { headers });
	const pdfResponse = await instance.get('/static/src/assets/test/document.pdf');
	console.log('pdfResponse', pdfResponse)
	
	
	//const documentBuffer = await pdfResponse.data.arrayBuffer();
  //console.log('documentBuffer', documentBuffer)
	
	
	// Pass the `ArrayBuffer` as a PDF option instead of a URL.
	return PSPDFKit.load({
		document: pdfResponse.data,
		container: '.pdf-container'
	});
}



// Company Ltd. bounding box

/*
const bbox = (await instance.search(searchQuery)).first().rectsOnPage.get(0);
const textAnnotation3 = new PSPDFKit.Annotations.TextAnnotation({
  boundingBox: bbox,
  fontSize: 8,
  text: data.companyName,
  pageIndex: 0,
  fontColor: PSPDFKit.Color.RED,
  backgroundColor: PSPDFKit.Color.WHITE,
});


// Add the annotations to the document.
await instance.create([textAnnotation3]);

const flattenedDocument = await instance.exportPDF({ flatten: true });
console.log(await instance.exportInstantJSON());
/*
// Create a free text annotation.
const textAnnotation = new PSPDFKit.Annotations.TextAnnotation({
  boundingBox: bbox, // Set the bounding box of the text annotation.
  fontSize: 8,
  text: data.companyName, // The text to overlay.
  pageIndex: 0, // The page index to overlay the text on.
  fontColor: PSPDFKit.Color.RED,
  backgroundColor: PSPDFKit.Color.WHITE
});
*/
  

interface Props {
  pdfFile: string
}

const props = defineProps<Props>()

//
//PSPDFKit.unload(".pdf-container");


const loadPSPDFKit = async () =>  {
  PSPDFKit.unload(".pdf-container");
  return PSPDFKit.load({
    // access the pdfFile from props
    document: props.pdfFile,
    container: ".pdf-container",
  });
}
    

/*
loadPSPDFKit().then((instance) => {
  this.$emit("loaded", instance);
});
*/


/*
watch()

pdfFile(val) {
  if (val) {
    loadPSPDFKit();
  }
},
*/
    

</script>


<template>
  <VBtn @click="loadProtectedPDF">
    click pdf
  </VBtn>
  <div class="pdf-container"></div>
</template>


<style lang="scss">
.pdf-container {
  height: 100vh;
}
</style>