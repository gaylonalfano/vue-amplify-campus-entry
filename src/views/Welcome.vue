<template>
  <!-- <div> -->
  <!--   <div v-if="authStateRef !== 'signedin'">You are signed out.</div> -->
  <!--   <amplify-authenticator> -->
  <!--     <div v-if="authStateRef === 'signedin' && userRef"> -->
  <!--       <div>Hello, {{ userRef.username }}</div> -->
  <!--     </div> -->
  <!--     <amplify-sign-out></amplify-sign-out> -->
  <!--   </amplify-authenticator> -->
  <!-- </div> -->
  <div class="welcome container">
    <amplify-authenticator
      v-if="authStateRef !== 'signedin'"
    ></amplify-authenticator>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import { onAuthUIStateChange, AuthState } from "@aws-amplify/ui-components";

export default defineComponent({
  name: "Welcome",
  setup() {
    // Following UI Components official tutorial but changing to Composition API:
    // https://docs.amplify.aws/ui/auth/authenticator/q/framework/vue#recommended-usage
    // Using REACTIVE REF w/ Types
    const authStateRef = ref<AuthState | undefined>(undefined);
    console.log("authStateRef: ", authStateRef.value);
    // let authStateConst = ""; // Nope
    const userRef = ref<object | undefined>(undefined);
    console.log("userRef: ", userRef.value);

    function unsubscribeAuth() {
      onAuthUIStateChange(
        (authState: AuthState, authData: object | undefined) => {
          console.log("onAuthUIStateChange");
          console.log("onAuthUIStateChange:authState: ", authState);
          console.log("onAuthUIStateChange:authData: ", authData);
          authStateRef.value = authState;
          userRef.value = authData;
        }
      );
    }

    // Q: Do I need to call this directly for created()?
    // A: Yes! Otherwise it doesn't run until we're about to Unmount!
    // NOTE: I could also just run the onAuthUIStateChange() directly
    unsubscribeAuth();

    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
      unsubscribeAuth();
    });

    return { authStateRef, userRef, unsubscribeAuth };
  }
});
</script>
