import Button from "./Button";

const Sidebar = () => {
    return (
        <div id='sidebar' className="mainItem">
            <div id='functions'>
                <Button text='Import' className='actionBtn' />
                
                <div id='annCategories'>
                    <Button text='Person' className='annCategoryBtn' />
                    <Button text='Location' className='annCategoryBtn' />
                    <Button text='Organization' className='annCategoryBtn' />
                </div>

                <Button text='Export' className='actionBtn' />
            </div>
            
        </div>
    )
}

export default Sidebar
