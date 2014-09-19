require "rails_helper"

describe ProjectsController do
	describe '#index' do
		it 'should render the projects index page' do
			get :index
			expect(response.status).to eq 200
		end
	end

	describe '#new' do
		it 'should render the new users page' do
			get :new
			expect(response.status).to eq 200
		end
	end

	# describe '#create' do
	# 	it 'should add a project to the database' do
	# 		name = "Project Name"
	# 		category_id = 1
	# 		initial_text = "Initial Text"
	# 		project = {name: name, category_id: category_id, initial_text: initial_text}
	# 		expect{post :create, {project: project}}.to change{Project.all.count}.by(1)
	# 	end
	# end
end
