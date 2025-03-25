import Swal from 'sweetalert2'
import { useCartNumStore } from '@/stores/counter'
import { useCartApi } from '@/composables/cartApi'

const { getCartInfo, deleteCartItem } = useCartApi()

export const useSweetAlert = () => {
  const cartStore = useCartNumStore()

  const successMsg = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      width: '250',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    })

    Toast.fire({
      icon: 'success',
      title: '成功加入購物車'
    })
  }

  const deleteMsg = async (info, cartId) => {
    const result = await Swal.fire({
      title: '確定刪除？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    })

    if (result.isConfirmed) {
      Swal.fire({
        title: '正在刪除',
        didOpen: () => {
          Swal.showLoading()
        }
      })

      try {
        await deleteCartItem(cartId)
        const cartInfo = await getCartInfo()
        info.value = cartInfo.data

        Swal.fire({
          title: '刪除成功',
          icon: 'success',
          didOpen: () => {
            Swal.hideLoading()
          }
        })

        cartStore.getCartNum()
      } catch (error) {
        console.error('刪除失敗：', error)
      }
    }
  }

  return { successMsg, deleteMsg }
}
