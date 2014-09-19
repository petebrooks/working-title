require 'rails_helper'

describe CategoriesController do
	before :each do
		categories = ['Story', 'Song', 'Poem']
		categories.each do |category|
			Category.create!(name: category)
		end
	end

	describe '#show' do
		it 'should render the show category page' do
			category = Category.all.sample
			get :show, {id: category.id}
			expect(response.status).to eq 200
		end
	end

	describe '#index' do
		it 'should render the index category page' do
			get :index
			expect(response.status).to eq 200
		end
	end
end
