const selectAllCheckbox = document.getElementById('selectAllCheckbox');
                                const alumniCheckboxes = document.querySelectorAll('.alumniCheckbox');
                            
                                selectAllCheckbox.addEventListener('change', () => {
                                    alumniCheckboxes.forEach(checkbox => {
                                        checkbox.checked = selectAllCheckbox.checked;
                                    });
                                });
                            
                                alumniCheckboxes.forEach(checkbox => {
                                    checkbox.addEventListener('change', () => {
                                        
                                        const allChecked = Array.from(alumniCheckboxes).every(cb => cb.checked);
                                        const noneChecked = Array.from(alumniCheckboxes).every(cb => !cb.checked);
                            
                                        selectAllCheckbox.checked = allChecked;
                                        selectAllCheckbox.indeterminate = !allChecked && !noneChecked;
                                    });
                                });
                            
                                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                                checkboxes.forEach((checkbox) => {
                                    checkbox.addEventListener('change', () => {
                                        console.log(`Checkbox ${checkbox.id} is ${checkbox.checked}`);
                                        
                                    });
                                });
                            
                                const deleteButton = document.getElementById('deleteButton');
                                deleteButton.addEventListener('click', async (event) => {
                                    event.preventDefault();
                            
                                    const selectedCheckboxes = Array.from(document.querySelectorAll('.alumniCheckbox:checked'));
                                    const alumniIdsToDelete = selectedCheckboxes.map(checkbox => {
                                        const idParts = checkbox.id.split('-');
                                        const alumniId = idParts[idParts.length - 1]; 
                                        return alumniId;
                                    });
                                    if (alumniIdsToDelete.length === 0) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Mohon untuk memilih satu data periode untuk dihapus.'
                                        });
                                        return;
                                    }
                            
                                    Swal.fire({
                                        title: 'Kamu yakin?',
                                        text: "Ga bisa balik lagi loh!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#d33', 
                                        cancelButtonColor: '#16A34A', 
                                        confirmButtonText: 'Yoi, hapus aja!'
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            try {
                                                const response = await fetch('/admin/tracerstudy/hapus', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ alumniIds: alumniIdsToDelete })
                                                });
                                    
                                                if (!response.ok) {
                                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                                }
                                    
                                                const data = await response.json();
                                                if (data.error) {
                                                    throw new Error(data.error);
                                                } else {
                                                
                                                    Swal.fire({
                                                        icon: data.message ? 'error' : 'success',
                                                        title: data.message || 'Periode berhasil dihapus!',
                                                        text: data.message && data.error ? data.error : '', 
                                                        confirmButtonText: 'OK'
                                                    });
                                                    
                                                }
                                    
                                                location.reload();
                                    
                                            } catch (error) {
                                                console.error('Error deleting periode:', error);
                                                alert('An error occurred while deleting periode.');
                                            }
                                        } 
                                    });
                                
                                });