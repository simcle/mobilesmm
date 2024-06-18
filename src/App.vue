<template>
	<div class=" bg-black min-h-screen">
		<div class="text-gray-300">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
		<div class="fixed bottom-0 h-14 bg-gray-900 w-full border-t border-gray-800">
			<div class="grid grid-cols-5 h-full">
				<router-link to="/" class="flex items-center justify-center text-gray-400">
					<div class="text-center">
						<i class="ph ph-house" style="font-size:20px"></i>
						<div class="text-xs">Dashboard</div>
					</div>
				</router-link>
				<router-link to="/statistik" class="flex items-center justify-center text-gray-400">
					<div class="text-center">
						<i class="ph ph-presentation-chart" style="font-size:20px"></i>
						<div class="text-xs">Statistik</div>
					</div>
				</router-link>
				<router-link to="/peringatan" class="flex items-center justify-center text-gray-400">
					<div class="text-center">
						<i class="ph ph-warning" style="font-size:20px"></i>
						<div class="text-xs">Peringatan</div>
					</div>
				</router-link>
				<router-link to="/laporan" class="flex items-center justify-center text-gray-400">
					<div class="text-center">
						<i class="ph ph-file-text" style="font-size:20px"></i>
						<div class="text-xs">Laporan</div>
					</div>
				</router-link>
				<router-link to="/akun" class="flex items-center justify-center text-gray-400">
					<div class="text-center">
						<i class="ph ph-user" style="font-size:20px"></i>
						<div class="text-xs">Akun</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	
}
</script>