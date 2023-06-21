<script setup lang="ts"></script>

<template>
  <div class="timeline-conversation">
    
    <!--Message-->
    <div class="conversation-message">
      <div class="message-text">
        <div class="message-box primary">
          <p>
            {{$t('clientChat2')}}
          </p>
        </div>
        <span class="meta">{{$t('clientFake2')}}</span>
      </div>
      <AvatarSimple picture="https://randomuser.me/api/portraits/men/43.jpg" size="medium" />
    </div>
    <!--Message-->
    <div class="conversation-message">
      <div class="message-text">
        <div class="message-box secondary">
          <p>{{$t('clientChat3')}}</p>
        </div>
        <span class="meta">{{$t('support')}}</span>
      </div>
      <AvatarSimple
        class="avatar"
        picture="https://randomuser.me/api/portraits/men/32.jpg"
        size="medium"
      />
    </div>
    <div class="conversation-message">
      <div class="message-text">
        <div class="message-box primary">
          <p>
           {{$t('clientChat4')}}
          </p>
        </div>
        <span class="meta">{{$t('clientFake2')}}</span>
      </div>
      <AvatarSimple picture="https://randomuser.me/api/portraits/men/43.jpg" size="medium" />
    </div>
  </div>
</template>


<style>
.avatar .avatar-image {
  object-fit: cover !important;
}
</style>

<style scoped lang="scss">
.timeline-conversation {
  .conversation-message {
    display: flex;
    justify-content: flex-end;

    :deep(.avatar) {
      margin-top: auto;
    }

    .message-text {
      margin-right: 2rem;

      .message-box {
        padding: 1rem;
        border-radius: 1rem 1rem 0;
        font-family: var(--font);
        font-size: 0.9rem;
        line-height: 1.3;
        margin-bottom: 0.25rem;

        &.primary {
          background: var(--primary);
          color: var(--white-smoke);
        }

        &.secondary {
          background: var(--secondary);
          color: var(--white-smoke);
        }
      }

      .meta {
        display: block;
        text-align: right;
        margin-left: auto;
        font-family: var(--font);
        font-size: 0.9rem;
        color: var(--light-text);
      }
    }

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}
</style>