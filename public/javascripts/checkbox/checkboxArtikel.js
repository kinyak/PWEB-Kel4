const selectAllCheckbox = document.getElementById('selectAllCheckbox');
                                const alumniCheckboxes = document.querySelectorAll('.alumniCheckbox');
                            
                                selectAllCheckbox.addEventListener('change', () => {
                                    alumniCheckboxes.forEach(checkbox => {
                                        checkbox.checked = selectAllCheckbox.checked;
                                    });
                                });
                            
                                alumniCheckboxes.forEach(checkbox => {
                                    checkbox.addEventListener('change', () => {
                                        // Update the "Select All" checkbox if all alumni checkboxes are checked or unchecked
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
                                        // Add your logic here to perform actions based on the checkbox state
                                    });
                                });
                            
                                const deleteButton = document.getElementById('deleteButton');
                                deleteButton.addEventListener('click', async (event) => {
                                    event.preventDefault();
                            
                                    const selectedCheckboxes = Array.from(document.querySelectorAll('.alumniCheckbox:checked'));
                                    const alumniIdsToDelete = selectedCheckboxes.map(checkbox => {
                                        const idParts = checkbox.id.split('-');
                                        const alumniId = idParts[idParts.length - 1]; // Assuming the alumni ID is the last part of the checkbox ID
                                        return alumniId;
                                    });
                                    if (alumniIdsToDelete.length === 0) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Mohon untuk memilih satu data artikel untuk dihapus.'
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
                                                const response = await fetch('/admin/artikel/hapus', {
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
                                                        title: data.message || 'Artikel berhasil dihapus!',
                                                        text: data.message && data.error ? data.error : '', // Optional: Display additional error details
                                                        confirmButtonText: 'OK'
                                                    });
                                                    
                                                }
                                    
                                                location.reload();
                                    
                                            } catch (error) {
                                                console.error('Error deleting alumni:', error);
                                                alert('An error occurred while deleting artikel.');
                                            }
                                        } 
                                    });
                                
                                });