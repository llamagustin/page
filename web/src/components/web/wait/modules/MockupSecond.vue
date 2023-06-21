<script setup lang="ts"></script>

<template>
  <div class="ui-mockup is-keywords">
    <div class="toolbar">
      <h3>Keywords</h3>
      <div class="field">
        <div class="control">
          <NinjaToggle name="demo-toggle" />
        </div>
      </div>
    </div>
    <div>
      <div class="flex" :style="{gap: '12px'}">
          <div class="gpt-logo">
            <img src="https://flowgpt.com/icons/chatgpt.png" />
          </div>
          <Card class="p-2 -mt-4">
            <p>
              Hi! This is ChatGPT. This is a fully integrated ChatGPT Playground. 
              Click Try This Prompt Now, or type your question in the chatbox below, 
              to start our conversation.
            </p>
            <Button>
              <span class="mr-2">
                Try This Prompt Now
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </Button>
          </Card>
        </div>
        <div>
          <div class="mt-10" v-for="(chat, index) in chatGPT">
              <div class="flex" :style="{gap: '12px'}">
                <div class="gpt-logo">
                  <img src="https://flowgpt.com/icons/chatgpt.png" />
                </div>
                <Card class="p-2 -mt-4">
                  <p>
                    {{chat.text}}
                  </p>
                </Card>
              </div>
          </div>
        </div>
        <hr />
        <div>
          <VTextarea v-model="textareaValue" placeholder="Write something..." />
        </div>
        <div class="mt-4 flex">
            <Button class="ml-auto">
              <span class="mr-2">
                Enviar
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </Button>
        </div>
    </div>
  </div>
</template>
