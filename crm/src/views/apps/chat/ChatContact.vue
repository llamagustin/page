<script lang="ts" setup>
// import type { ChatContact, ChatContactWithChat } from "@/@fake-db/types";
import { useChat } from "@/views/apps/chat/useChat";
import { useChatStore } from "@/views/apps/chat/useChatStore";
import { avatarText, formatDateToMonthShort } from "@core/utils/formatters";
import { defineProps, toRefs } from "vue";

interface Props {
  isChatContact?: boolean;
  user: any;
}

const props = withDefaults(defineProps<Props>(), {
  isChatContact: false,
});

const { user } = toRefs(props);

const store = useChatStore();
const { resolveAvatarBadgeVariant, resolveUserStatusVariant } = useChat();


const isChatContactActive = computed(() => {
  // const isActive = store.activeChat?.user_id === props.user.id;
  // if (!props.isChatContact) return !store.activeChat?.chat && isActive;
  // return isActive;
  
  if(!props.isChatContact) return false;
  return store.activeChat?.user_id === props.user.user_id;
});

const userData = computed(() => {
  if(props.isChatContact) {

    const firstKey = Object.keys(user.value.members)[0]
    const messages = user.value['messages']
    const lastIndex = messages.length - 1
    
    if(store.activeChat?.members) {
      const activeFirstKey = Object.keys(store.activeChat?.members)[0]
      if(activeFirstKey === firstKey) {
        return {
          fullName: user.value['members']?.[firstKey]?.name,
          description: messages[lastIndex].message,
          time: messages[lastIndex].time,
        }
      }
    }
    return {
      fullName: user.value['members']?.[firstKey]?.name,
      description: messages[lastIndex].message,
      time: messages[lastIndex].time,
    }
  } else {
    return {
      fullName: user.value.fullName,
      description: user.value.about
    }
  }
})


const getNameUser = (name) => {
  if(!name?.name) return 'New lead'
  return (name.name + ' ' + name.firstSurname + ' ' + name.secondSurname) || 'Unknown'
}

const sliceMessage = message => {
  if(!message) return ''
  if(message.length <= 30) return message
  return message.slice(0,30) + '...'
}
</script>

<template>
  <!--{{user}}-->
  <!--{{user.id}}-->
  <!--{{user.status}}-->
  <!--{{user.phone}}-->
  <!--{{user.avatar}}-->
  <!--{{user.name}}<br>-->
  <!--{{user.fullName}}-->
  <!--{{user}}-->
  <li
    v-if="(user.id !== store.profileUser?.id)"
    :key="store.contacts.length"
    class="chat-contact cursor-pointer d-flex align-center"
    :data-x="store.contacts.length"
  >
    <div :class="{ 'chat-contact-active': isChatContactActive }">
      <div v-if="isChatContact || props.isChatContact && 'chat' in props.user" class="d-flex gap-1">
        <VBadge dot 
          location="bottom right"
          offset-x="3"
          offset-y="3"
          bordered
          :color="resolveUserStatusVariant(user.user?.status)"
          :model-value="props.isChatContact"
        >
          <VAvatar size="40" variant="tonal" :color="resolveUserStatusVariant(user.user?.status)">
            <!--:color="resolveAvatarBadgeVariant(props.user.status)"-->
            <VImg v-if="user.user?.avatar" :src="user.user?.avatar" />
            <span v-else>{{ avatarText(user.user?.name?.name || '?') }}</span>
          </VAvatar>
        </VBadge>
        <div class="flex-grow-1 ms-4 overflow-hidden">
          {{ getNameUser(user.user?.name) }}
          <span class="d-block text-sm text-truncate text-disabled">
            {{ sliceMessage(user.messages?.at(-1)?.message) }}
          </span>
        </div>
        
        <!--<code><pre>{{user.members}}</pre></code>-->
        <!--WhatsApp que recuperar-->
        <!--Nuevo cliente-->
        <!--
        <div v-if="false">
          <span  v-if="false" class="d-block text-disabled whitespace-no-wrap">
              b{{ formatDateToMonthShort(userData.updatedAt) }}
            </span>
            <VBadge
              v-if="props.user.chat.unseenMsgs"
              color="error"
              inline
              :content="props.user.chat.unseenMsgs"
              class="ms-auto"
            />
        </div>
        -->
      </div>
      <div v-else class="d-flex">
          <VBadge
            dot
            location="bottom right"
            offset-x="3"
            offset-y="3"
            bordered
            :color="resolveUserStatusVariant(user.status)"
            :model-value="props.isChatContact"
          >
            <VAvatar
              size="40"
              variant="tonal"
              :color="resolveUserStatusVariant(user.status)"
            >
              <!--:color="resolveAvatarBadgeVariant(props.user.status)"-->
              
              <VImg
                v-if="user.avatar"
                :src="user.avatar"
                :alt="user.name?.name"
              />
              <span v-else>{{ avatarText(user.name?.name || '?') }}</span>
            </VAvatar>
          </VBadge>
          <div class="flex-grow-1 ms-4 overflow-hidden" >
            <!--<span>{{user.name}}</span>-->
            <span v-if="user.name?.name">
              {{getNameUser(user.name)}}
            </span>
            <span v-else-if="user.company" >
              {{user.company.substr(0, 20)}}
            </span>
            <span class="d-block text-sm text-truncate text-disabled">
              {{ user.phone }}
              <!--{{-->
              <!--  props.isChatContact && "chat" in props.user-->
              <!--    ? props.user.chat.lastMessage.message-->
              <!--    : props.user.about-->
              <!--}}-->
            </span>
          </div>
          <div class="d-flex flex-column align-self-start">
            {{userData.updatedAt}}
            <span  v-if="false" class="d-block text-disabled whitespace-no-wrap">
              b{{ formatDateToMonthShort(userData.updatedAt) }}
            </span>
          </div>
      </div>
    </div>
  </li>
</template>

<style lang="scss">
@use "@/styles/variables/_vuetify.scss";
@use "@core/scss/base/mixins";
@use "vuetify/lib/styles/tools/states" as vuetifyStates;

.chat-contact {
  border-radius: vuetify.$card-border-radius;
  padding-block: 10px;
  padding-inline: var(--chat-content-spacing-x);

  @include mixins.before-pseudo;
  @include vuetifyStates.states($active: false);

  &.chat-contact-active {
    .v-avatar {
      background: #fff;
      outline: 2px solid #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }

  &.chat-contact-active {
    background: linear-gradient(
      270deg,
      rgb(var(--v-theme-primary)) 0%,
      #fff 300%
    );
    color: #fff;

    --v-theme-on-background: #fff;
  }
}
</style>
