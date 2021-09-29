<template>
  <div class="about">
    <v-card class="ABC-card" max-width="400">
      <v-row>
        <v-col cols="4" sm="6">
          <div>Anchor</div>
        </v-col>
        <v-col cols="7" sm="6">
          <v-textarea
            filled
            auto-grow
            label="After I..."
            rows="2"
            row-height="20"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="6">
          <div>Behavior</div>
        </v-col>
        <v-col cols="7" sm="6">
          <v-textarea
            filled
            auto-grow
            label="I will..."
            rows="2"
            row-height="20"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped>
.ABC-card {
  margin: 20px;
}
</style>
