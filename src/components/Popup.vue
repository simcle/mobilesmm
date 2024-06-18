<template>
	<div @click="$emit('onClose')">
		<transition name="modal" mode="out-in">
			<div v-show="show" class="fixed inset-x-0 z-20 overflow-y-auto bottom-0">
				<div class="flex justify-center">
					<div class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
					<transition name="slide" >
						<div v-show="show" @click.stop="" class="transform flex justify-center w-full">
							<slot></slot>
						</div>
					</transition>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
    props: {
        show: Boolean
    },
}
</script>